"""Copy dist/ to a folder for hosts that cannot serve .glb (e.g. some sandboxed page hosts):
every used GLB becomes <name>.glb.json ({"glb": base64}) and catalog/characters point to it.
Usage: python3 scripts/pack-for-glb-less-host.py dist out_dir"""
import base64, json, pathlib, shutil, sys
src, out = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
if out.exists(): shutil.rmtree(out)
shutil.copytree(src, out, ignore=shutil.ignore_patterns('hair'))
for glb in (out / 'assets/models').rglob('*.glb'):
    (glb.parent / (glb.name + '.json')).write_text(json.dumps({'glb': base64.b64encode(glb.read_bytes()).decode()}))
    glb.unlink()
def fix(o):
    if isinstance(o, dict): return {k: (v + '.json' if k == 'glb' and isinstance(v, str) and v.endswith('.glb') else fix(v)) for k, v in o.items()}
    if isinstance(o, list): return [fix(x) for x in o]
    return o.replace('.glb', '.glb.json') if isinstance(o, str) and o.endswith('.glb') else o
for name in ('catalog.json', 'characters.json'):
    p = out / 'assets/data' / name
    p.write_text(json.dumps(fix(json.loads(p.read_text())), ensure_ascii=False, indent=2))
print('ok', out)
