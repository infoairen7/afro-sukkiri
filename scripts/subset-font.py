"""Subset M PLUS Rounded 1c (SIL OFL 1.1) to the characters used by the game UI.
Usage: python3 scripts/subset-font.py <dir-with-MPLUSRounded1c-*.ttf>
Re-run after adding new Japanese UI text."""
import sys, re, pathlib
from fontTools import subset
from fontTools.ttLib import TTFont

root = pathlib.Path(__file__).resolve().parents[1]
src_dir = pathlib.Path(sys.argv[1])
chars = set()
for p in list((root / 'src').rglob('*.ts')) + [root / 'index.html'] + list((root / 'public/assets/data').glob('c*.json')):
    chars |= set(p.read_text(encoding='utf-8'))
chars |= set(''.join(chr(c) for c in range(0x20, 0x7f)))
chars |= set('０１２３４５６７８９％：／・ー〜！？（）「」『』、。…＋－×')
chars = {c for c in chars if ord(c) >= 0x20}
text = ''.join(sorted(chars))
out = root / 'public/fonts'
out.mkdir(parents=True, exist_ok=True)
for weight, name in [(500, 'Medium'), (800, 'ExtraBold'), (900, 'Black')]:
    font = TTFont(src_dir / f'MPLUSRounded1c-{name}.ttf')
    opts = subset.Options()
    opts.flavor = 'woff'
    opts.layout_features = ['*']
    opts.name_IDs = ['*']
    opts.notdef_outline = True
    s = subset.Subsetter(opts)
    s.populate(text=text)
    s.subset(font)
    dest = out / f'afro-rounded-{weight}.woff'
    font.flavor = 'woff'
    font.save(dest)
    print(dest.name, dest.stat().st_size, 'bytes,', len(text), 'chars')
