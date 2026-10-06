"""Four original emotion identities. Python 3 + numpy; run after build_models.py.
Upper scalp Head and origin are identical to the original for hair compatibility.
Faces use independently named static meshes; no skeleton or animation clips.
"""
import json,math
import numpy as np
from build_models import Asset,ROOT,make_man,quat_y_to,AQUA,HAIR

CHARACTERS=[
 dict(id='joy',name='にこ丸',emotion='喜',accent='#FFD15C',skin='#F1BA95',description='ふっくらした丸い頬、小さい鼻、細い笑い目。ひげなし。'),
 dict(id='anger',name='むす鉄',emotion='怒',accent='#FF855E',skin='#DEAC84',description='広いあご、太い斜め眉、大きな鼻、短い囲みひげ。'),
 dict(id='sadness',name='しょん吉',emotion='哀',accent='#B6A0E8',skin='#E9B997',description='長めのあごと鼻、内側が上がった眉、垂れひげ、下がった口。'),
 dict(id='laughter',name='ゲラ蔵',emotion='楽',accent='#93D8C6',skin='#EFB08C',description='大きな耳と頬、開いた笑い口、すき間のある前歯、跳ね上がるひげ。')
]

def qz(angle): return [0,0,math.sin(angle/2),math.cos(angle/2)]

def curve(a,name,points,r,color):
    # Capsule-like sections, so lines are real three-dimensional meshes.
    for i,(p1,p2) in enumerate(zip(points,points[1:])):
        p1=np.array(p1);p2=np.array(p2);v=p2-p1;l=float(np.linalg.norm(v))
        a.add(f'{name}_{i:02d}',pos=(p1+p2)/2,scale=(r,l*.5+r*.35,r),color=color,quat=quat_y_to(v))

def arch(a,name,cx,cy,z,half,depth,r,color,up=True):
    pts=[]
    for t in np.linspace(-1,1,11):
        pts.append([cx+t*half,cy+(1-t*t)*depth*(1 if up else -1),z])
    curve(a,name,pts,r,color)

def make_character(kind):
    info=next(x for x in CHARACTERS if x['id']==kind);skin=info['skin'];a=Asset()
    a.add('Cape',pos=(0,-1.29,0),scale=(1.18,.40,.70),color=AQUA)
    a.add('Collar',pos=(0,-1.01,0),scale=(.43,.11,.40),color='#E5FAFA')
    a.add('Neck',pos=(0,-.85,0),scale=(.37,.33,.35),color=skin)
    a.add('Head',scale=(.78,1.,.78),rough=.38,color=skin,extra=dict(role='shared-scalp'))
    a.add('Emotion_badge',pos=(.72,-1.24,.54),scale=(.105,.105,.025),color=info['accent'])
    for s in (-1,1):
        ear_scale=(.24,.32,.17) if kind=='laughter' else (.17,.26,.15) if kind=='sadness' else (.19,.26,.16)
        a.add(f'Ear_{s}',pos=(s*.79,-.15,0),scale=ear_scale,color=skin)
        a.add(f'Ear_inner_{s}',pos=(s*.85,-.14,.12),scale=(ear_scale[0]*.48,ear_scale[1]*.60,.048),color='#CE907B')
    if kind=='joy':
        a.add('Chin_round',pos=(0,-.67,.33),scale=(.49,.30,.38),color=skin)
        for s in (-1,1):
            a.add(f'Cheek_{s}',pos=(s*.43,-.30,.61),scale=(.28,.255,.20),color=skin)
            a.add(f'Blush_{s}',pos=(s*.48,-.245,.765),scale=(.12,.065,.021),color='#EBA18F')
            arch(a,f'Eye_smile_{s}',s*.29,.005,.754,.115,.065,.019,HAIR)
            arch(a,f'Brow_{s}',s*.29,.225,.695,.145,.063,.033,'#704633')
        a.add('Nose_button',pos=(0,-.13,.79),scale=(.125,.103,.14),color=skin)
        arch(a,'Mouth_smile',0,-.335,.79,.29,.095,.020,'#985D48',up=False)
        a.add('Lower_lip',pos=(0,-.448,.742),scale=(.14,.025,.025),color='#CF8D74')
    elif kind=='anger':
        for s in (-1,1):
            a.add(f'Jaw_corner_{s}',pos=(s*.43,-.56,.31),scale=(.33,.29,.38),color=skin)
            a.add(f'Cheek_{s}',pos=(s*.41,-.25,.57),scale=(.25,.17,.15),color=skin)
            a.add(f'Eye_white_{s}',pos=(s*.275,.01,.74),scale=(.145,.069,.059),color='#FFF8ED',quat=qz(s*.20))
            a.add(f'Eye_pupil_{s}',pos=(s*.252,.003,.789),scale=(.043,.058,.019),color=HAIR)
            a.add(f'Brow_{s}',pos=(s*.27,.186,.749),scale=(.209,.073,.052),color=HAIR,quat=qz(s*.40))
            curve(a,f'Moustache_{s}',[[s*.025,-.30,.83],[s*.15,-.31,.81],[s*.25,-.36,.766]],.042,HAIR)
            curve(a,f'Beard_side_{s}',[[s*.62,-.35,.51],[s*.60,-.53,.51],[s*.49,-.72,.56],[s*.28,-.83,.57]],.057,'#51443F')
            curve(a,f'Beard_gray_{s}',[[s*.58,-.57,.56],[s*.46,-.72,.61]],.013,'#A5A09A')
        a.add('Jaw_chin',pos=(0,-.74,.29),scale=(.47,.22,.39),color=skin)
        a.add('Nose_wide',pos=(0,-.115,.83),scale=(.235,.15,.16),color=skin)
        arch(a,'Mouth_frown',0,-.48,.725,.235,.045,.020,'#784D43',up=True)
        curve(a,'Beard_chin',[[-.30,-.82,.59],[0,-.865,.57],[.30,-.82,.59]],.062,'#51443F')
        curve(a,'Forehead_line',[[-.04,.27,.738],[-.02,.34,.722]],.010,'#B98269')
    elif kind=='sadness':
        a.add('Long_chin',pos=(0,-.80,.23),scale=(.285,.34,.33),color=skin)
        a.add('Muzzle_long',pos=(0,-.43,.56),scale=(.27,.35,.17),color=skin)
        for s in (-1,1):
            a.add(f'Eye_white_{s}',pos=(s*.28,.025,.733),scale=(.137,.085,.058),color='#FFF9ED')
            a.add(f'Eye_pupil_{s}',pos=(s*.256,-.012,.783),scale=(.047,.055,.023),color=HAIR)
            a.add(f'Eye_bag_{s}',pos=(s*.30,-.08,.717),scale=(.144,.029,.028),color='#C7947D')
            curve(a,f'Brow_{s}',[[s*.11,.285,.716],[s*.24,.225,.724],[s*.43,.15,.669]],.026,'#574037')
            curve(a,f'Moustache_{s}',[[s*.055,-.345,.845],[s*.15,-.40,.821],[s*.20,-.52,.756]],.034,'#574037')
        a.add('Nose_bridge',pos=(0,-.11,.80),scale=(.105,.23,.16),color=skin)
        a.add('Nose_tip',pos=(0,-.245,.925),scale=(.12,.113,.145),color=skin)
        arch(a,'Mouth_sad',0,-.63,.663,.18,.078,.022,'#895B50',up=True)
        a.add('Tear',pos=(-.44,-.18,.704),scale=(.033,.082,.025),color='#B8EAF7',rough=.2)
    elif kind=='laughter':
        a.add('Wide_chin',pos=(0,-.68,.33),scale=(.60,.29,.40),color=skin)
        for s in (-1,1):
            a.add(f'Cheek_{s}',pos=(s*.46,-.23,.61),scale=(.29,.23,.185),color=skin)
            arch(a,f'Eye_laugh_{s}',s*.29,.014,.767,.125,.075,.023,HAIR)
            a.add(f'Brow_{s}',pos=(s*.32,.283,.682),scale=(.15,.047,.045),color='#58372C',quat=qz(s*.21))
            curve(a,f'Moustache_{s}',[[s*.04,-.24,.845],[s*.17,-.28,.844],[s*.32,-.25,.824],[s*.39,-.17,.772]],.034,'#58372C')
        a.add('Nose_short',pos=(0,-.105,.823),scale=(.20,.10,.16),color=skin)
        a.add('Mouth_rim',pos=(0,-.45,.697),scale=(.345,.258,.13),color='#B67158')
        a.add('Mouth_open',pos=(0,-.442,.752),scale=(.293,.215,.104),color='#592821')
        a.add('Tongue',pos=(0,-.552,.839),scale=(.174,.058,.035),color='#E69889')
        for s in (-1,1):
            a.add(f'Tooth_{s}',shape='box',pos=(s*.069,-.297,.842),scale=(.115,.09,.025),color='#FFF4DD',quat=qz(-s*.03))
    return a

def build():
    descriptors=[];parts={}
    for info in CHARACTERS:
        a=make_character(info['id']);path=f"models/characters/{info['id']}.glb"
        a.export(ROOT/path,dict(role='static emotion character prototype',characterId=info['id'],emotion=info['emotion'],rigged=False,headRadii=[.78,1,.78],hairCompatibility='all-v1'))
        desc={**info,'glb':path,'scalpRadii':[.78,1,.78],'hairTransform':{'position':[0,0,0],'rotation':[0,0,0],'scale':[1,1,1]},'hairCompatibility':'all-v1','rigged':False,'animationClips':[], 'scoreMultiplier':1}
        descriptors.append(desc);parts[info['id']]=a.parts
    base=dict(id='base',name='いつものおじさん',emotion='穏',glb='models/ojisan_base.glb',scalpRadii=[.78,1,.78],hairCompatibility='all-v1',rigged=False,scoreMultiplier=1)
    data=dict(version='1.1',defaultCharacter='base',characters=[base]+descriptors)
    (ROOT/'data/characters.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
    (ROOT/'data/character_parts.json').write_text(json.dumps(parts,ensure_ascii=False,separators=(',',':')))
    catalog=json.loads((ROOT/'data/catalog.json').read_text());catalog.update(version='1.1',characters=data['characters'],characterCatalog='data/characters.json')
    (ROOT/'data/catalog.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2))
    print('Added 4 unique static GLBs; total 5 characters, 19 GLBs.')

if __name__=='__main__':build()
