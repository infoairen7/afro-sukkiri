"""Original prototype assets; Python 3 + numpy. Run from this package's source/.
GLB uses core glTF 2.0, Y up, +Z forward, arbitrary game units.
No downloaded models or external textures. Not production/sculpted art.
"""
import json, math, struct, colorsys
from pathlib import Path
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
PI = math.pi
SKIN = '#EFB48B'; INK = '#183C4A'; HAIR = '#28232A'; AQUA = '#65D6E8'

def rgb(h):
    return [int(h[i:i+2],16)/255 for i in (1,3,5)]

def sphere(nx=20, ny=14):
    p=[]; n=[]; f=[]
    for j in range(ny+1):
        t=PI*j/ny
        for i in range(nx+1):
            a=2*PI*i/nx
            v=[math.sin(t)*math.sin(a),math.cos(t),math.sin(t)*math.cos(a)]
            p.append(v); n.append(v)
    for j in range(ny):
        for i in range(nx):
            a=j*(nx+1)+i; b=a+nx+1
            if j>0: f.append([a,a+1,b])
            if j<ny-1: f.append([a+1,b+1,b])
    # correct outward winding
    p=np.array(p,dtype=np.float32); f=np.array(f,dtype=np.uint32)
    k=len(f)//2
    if np.dot(np.cross(p[f[k,1]]-p[f[k,0]],p[f[k,2]]-p[f[k,0]]),p[f[k]].mean(0))<0:
        f=f[:,[0,2,1]]
    return p,np.array(n,dtype=np.float32),f

def box():
    p=[]; n=[]; f=[]
    for axis in range(3):
        u=(axis+1)%3; v=(axis+2)%3
        for sign in (-1,1):
            base=len(p)
            for a,b in [(-1,-1),(1,-1),(1,1),(-1,1)]:
                q=[0.,0.,0.]; q[axis]=sign*.5; q[u]=a*.5; q[v]=b*.5
                nn=[0,0,0]; nn[axis]=sign; p.append(q); n.append(nn)
            faces=[[base,base+1,base+2],[base,base+2,base+3]]
            if sign<0: faces=[x[::-1] for x in faces]
            f.extend(faces)
    return np.array(p,np.float32),np.array(n,np.float32),np.array(f,np.uint32)

def quat_y_to(vec):
    v=np.array(vec,float); v/=np.linalg.norm(v)
    d=v[1]
    if d<-0.999999: return [1,0,0,0]
    q=np.array([v[2],0,-v[0],1+d]); q/=np.linalg.norm(q)
    return q.tolist()

class Asset:
    def __init__(self):
        self.parts=[]
    def add(self,name,shape='sphere',pos=(0,0,0),scale=(1,1,1),color=SKIN,rough=.55,metal=0,quat=None,extra=None):
        self.parts.append(dict(name=name,shape=shape,pos=list(pos),scale=list(scale),color=color,rough=rough,metal=metal,quat=quat,extra=extra))
    def export(self,path,extras=None):
        data=bytearray(); views=[]; acc=[]; meshes=[]; mats=[]; nodes=[]; geomcache={}; matcache={}; meshcache={}
        def accessor(ar,typ,component,target):
            while len(data)%4: data.append(0)
            start=len(data); data.extend(ar.tobytes())
            views.append(dict(buffer=0,byteOffset=start,byteLength=ar.nbytes,target=target))
            a=dict(bufferView=len(views)-1,componentType=component,count=len(ar),type=typ)
            if typ=='VEC3': a.update(min=ar.min(0).tolist(),max=ar.max(0).tolist())
            acc.append(a); return len(acc)-1
        for part in self.parts:
            shape=part['shape']
            if shape not in geomcache:
                p,n,f=box() if shape=='box' else sphere(12,8) if shape=='curl' else sphere()
                geomcache[shape]=(accessor(p,'VEC3',5126,34962),accessor(n,'VEC3',5126,34962),accessor(f.reshape(-1),'SCALAR',5125,34963))
            mk=(part['color'],part['rough'],part['metal'])
            if mk not in matcache:
                mats.append(dict(name=part['color'],pbrMetallicRoughness=dict(baseColorFactor=rgb(part['color'])+[1],roughnessFactor=part['rough'],metallicFactor=part['metal'])))
                matcache[mk]=len(mats)-1
            key=(shape,mk)
            if key not in meshcache:
                p,n,f=geomcache[shape]
                meshes.append(dict(primitives=[dict(attributes=dict(POSITION=p,NORMAL=n),indices=f,material=matcache[mk])]))
                meshcache[key]=len(meshes)-1
            node=dict(name=part['name'],mesh=meshcache[key],translation=part['pos'],scale=part['scale'])
            if part['quat']: node['rotation']=part['quat']
            if part['extra']: node['extras']=part['extra']
            nodes.append(node)
        g=dict(asset=dict(version='2.0',generator='Afro Sukkiri original prototype generator 1.0'),scene=0,scenes=[dict(nodes=list(range(len(nodes))))],nodes=nodes,meshes=meshes,materials=mats,accessors=acc,bufferViews=views,buffers=[dict(byteLength=len(data))],extras=extras or {})
        j=json.dumps(g,separators=(',',':'),ensure_ascii=False).encode(); j+=b' '*((-len(j))%4); data+=b'\x00'*((-len(data))%4)
        payload=struct.pack('<II',len(j),0x4E4F534A)+j+struct.pack('<II',len(data),0x004E4942)+data
        path.parent.mkdir(parents=True,exist_ok=True); path.write_bytes(struct.pack('<III',0x46546C67,2,12+len(payload))+payload)

def make_man():
    a=Asset()
    a.add('Cape',pos=(0,-1.23,0),scale=(1.18,.46,.70),color=AQUA)
    a.add('Collar',pos=(0,-.94,0),scale=(.43,.13,.40),color='#E5FAFA')
    a.add('Neck',pos=(0,-.83,0),scale=(.37,.32,.35))
    a.add('Head',scale=(.78,1.,.78),rough=.38)
    for side in (-1,1):
        a.add('Ear_L' if side<0 else 'Ear_R',pos=(side*.78,-.15,0),scale=(.18,.29,.15))
        a.add('Ear_inner_'+str(side),pos=(side*.83,-.13,.11),scale=(.075,.16,.045),color='#D98D73')
        a.add('Cheek_'+str(side),pos=(side*.40,-.32,.58),scale=(.23,.19,.16),color='#EBA683')
        a.add('Eye_white_'+str(side),pos=(side*.27,.04,.718),scale=(.155,.105,.065),color='#FFF7EB')
        a.add('Eye_pupil_'+str(side),pos=(side*.26,.037,.775),scale=(.058,.078,.033),color='#302526')
        a.add('Eye_sparkle_'+str(side),pos=(side*.25,.07,.804),scale=(.020,.024,.011),color='#FFFFFF')
        a.add('Brow_'+str(side),pos=(side*.27,.235,.692),scale=(.185,.051,.066),color=HAIR)
        a.add('Moustache_'+str(side),pos=(side*.14,-.265,.775),scale=(.185,.075,.065),color=HAIR)
    a.add('Nose',pos=(0,-.11,.79),scale=(.17,.15,.20))
    a.add('Smile',pos=(0,-.412,.681),scale=(.20,.057,.044),color='#874C45')
    a.add('Lower_lip',pos=(0,-.453,.687),scale=(.17,.027,.038),color='#D98D73')
    return a

HAIRSTYLES=[
 ('classic','まんまるアフロ',45,'#28232A'),
 ('jumbo','メガ盛りアフロ',65,'#49302A'),
 ('tight','くるくるパーマ',35,'#28232A'),
 ('mohawk','炎のモヒカン',40,'#EC773C'),
 ('twins','ツインもふもふ',45,'#398CCE'),
 ('swirl','うずまきヘア',50,'#714532'),
 ('flat','角刈りタワー',45,'#28232A'),
 ('rainbow','虹色アフロ',45,'#F4A0CB')]

def make_hair(kind,color):
    a=Asset(); roots=[]; count=1500
    # Equal-area sphere candidates, clipped to a forehead / temple / nape mask.
    for k in range(count):
        y=1-2*(k+.5)/count; ph=k*PI*(3-math.sqrt(5))
        r=math.sqrt(1-y*y); u=np.array([r*math.sin(ph),y,r*math.cos(ph)])
        front=max(0,u[2]); threshold=-.37+.88*front**2
        if u[1]<threshold: continue
        root=u*np.array([.78,1,.78]); normal=u/np.array([.78,1,.78]); normal/=np.linalg.norm(normal)
        h=.28+.30*(1-max(0,u[1])); width=.086
        if kind=='jumbo': h=.53+.30*(1-max(0,u[1])); width=.12
        if kind=='tight': h=.16; width=.062
        if kind=='mohawk': h=.56 if abs(u[0])<.19 else .055; width=.072
        if kind=='twins':
            h=.50 if abs(u[0])>.55 and u[1]>.2 else .065; width=.085
        if kind=='swirl': h=.18+.30*max(0,u[1])+.085*math.sin(4*ph+7*u[1]); width=.092
        growth=normal.copy()
        if kind=='flat':
            h=max(.055,1.32-root[1]) if u[1]>.45 else .085; width=.077
            if u[1]>.45: growth=np.array([0.,1.,0.])
        h=max(.035,h)
        col=color
        if kind in ('mohawk','twins') and h<.1: col=HAIR
        if kind=='rainbow':
            rr=colorsys.hsv_to_rgb((math.atan2(u[0],u[2])/(2*PI)+.5)%1,.55,.94)
            col='#'+''.join(f'{round(x*255):02x}' for x in rr)
        idx=len(roots); q=quat_y_to(growth)
        pos=root+growth*h*.5
        a.add(f'Hair_{idx:04d}',shape='curl',pos=pos,scale=(width,h*.5,width),color=col,quat=q,extra=dict(rootId=idx))
        roots.append(dict(id=idx,position=root.round(6).tolist(),normal=normal.round(6).tolist(),growthDirection=growth.round(6).tolist(),initialHeight=round(h,6),radius=width,color=col,weight=1))
    return a,roots

TOOLS=[
 ('standard','スタンダード',AQUA,.16,1.0),
 ('wide','ワイド', '#FFD15C',.25,.80),
 ('turbo','ターボ','#FF855E',.16,1.55),
 ('vacuum','吸引バリカン','#93D8C6',.16,.95),
 ('detail','キワ剃り','#183C4A',.09,1.0),
 ('polish','つるピカ','#B6A0E8',.18,.45)]

def make_clipper(kind,color):
    a=Asset(); w=.19 if kind!='detail' else .125
    a.add('Grip',pos=(0,-.17,0),scale=(w,.40,.13),color=color)
    a.add('Rubber_back',pos=(0,-.19,-.09),scale=(w*.88,.33,.065),color=INK)
    a.add('Power_button',pos=(0,-.10,.121),scale=(.053,.069,.023),color=INK)
    a.add('Indicator',shape='box',pos=(0,-.09,.145),scale=(.010,.039,.006),color='#B6F9FA')
    bw=.56 if kind=='wide' else .20 if kind=='detail' else .36
    a.add('Blade_mount',shape='box',pos=(0,.215,0),scale=(bw,.09,.15),color=INK)
    if kind=='polish':
        for z in (-.042,.05):
            a.add('Foil_'+str(z),pos=(0,.277,z),scale=(.18,.055,.047),color='#BFCBD3',metal=.8,rough=.28)
    else:
        a.add('Blade_plate',shape='box',pos=(0,.271,0),scale=(bw,.05,.15),color='#BDC7CD',metal=.8,rough=.28)
        for i in range(12):
            a.add(f'Tooth_{i}',shape='box',pos=((i/11-.5)*(bw-.022),.309,.012),scale=(.013,.038,.105),color='#E5E7E8',metal=.8,rough=.26)
    if kind=='turbo':
        for i in range(3): a.add('Vent_'+str(i),shape='box',pos=(0,.04+i*.047,.118),scale=(.16,.018,.014),color=INK)
    if kind=='vacuum':
        a.add('Collector_window',pos=(0,-.31,.105),scale=(.115,.15,.059),color='#D7F0EE',rough=.2)
        for i in range(9):
            a.add('Collected_hair_'+str(i),shape='curl',pos=((i%3-1)*.041,-.34+(i//3)*.036,.157),scale=(.018,.012,.008),color=HAIR)
    return a

def build():
    man=make_man(); man.export(ROOT/'models/ojisan_base.glb',dict(role='prototype bald bust',rigged=False,coordinateSystem='Y-up, +Z face, head center origin',headRadii=[.78,1,.78]))
    hair_manifest=[]
    for kind,label,par,color in HAIRSTYLES:
        a,roots=make_hair(kind,color); a.export(ROOT/f'models/hair/{kind}.glb',dict(role='static reference with independently named root nodes',rigged=False))
        (ROOT/f'data/hair_{kind}.json').write_text(json.dumps(dict(version='1.0',kind=kind,scalpRadii=[.78,1,.78],roots=roots),ensure_ascii=False,separators=(',',':')))
        hair_manifest.append(dict(id=kind,name=label,parSeconds=par,glb=f'models/hair/{kind}.glb',roots=f'data/hair_{kind}.json',count=len(roots)))
    tool_manifest=[]
    for kind,label,color,radius,speed in TOOLS:
        make_clipper(kind,color).export(ROOT/f'models/clippers/{kind}.glb',dict(role='prototype prop',bladeCenter=[0,.30,0],bladeAxis='+X',cutNormal='+Z'))
        tool_manifest.append(dict(id=kind,name=label,color=color,radius=radius,cutRate=speed,glb=f'models/clippers/{kind}.glb'))
    (ROOT/'data/catalog.json').write_text(json.dumps(dict(version='1.0',quality='prototype',character='models/ojisan_base.glb',hair=hair_manifest,clippers=tool_manifest),ensure_ascii=False,indent=2))
    # Software/native preview can reuse this metadata without altering GLBs.
    (ROOT/'data/model_parts.json').write_text(json.dumps(dict(man=man.parts,classic=make_hair('classic',HAIR)[0].parts,clippers={k:make_clipper(k,c).parts for k,n,c,r,s in TOOLS}),separators=(',',':')))
    print('Built 15 GLB assets and 8 root maps.')

if __name__=='__main__': build()
