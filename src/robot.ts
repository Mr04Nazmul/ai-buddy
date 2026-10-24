import * as T from 'three';
export function createRobot(host:HTMLElement,onError:(s:string)=>void){
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(34,1,.1,100);camera.position.set(0,1.4,7.7);camera.lookAt(0,.45,0);
 let renderer:T.WebGLRenderer;try{renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});}catch{onError('3D is unavailable here. Showing a 2D fallback; update your browser for the full robot.');const fallback=document.createElement('img');fallback.src='./icon.svg';fallback.alt='Buddy robot — 2D fallback because WebGL is unavailable';fallback.style.cssText='position:absolute;width:220px;height:220px;top:50%;left:50%;transform:translate(-50%,-50%);border-radius:45%;z-index:2';host.append(fallback);return {setState:(_:string)=>{},setColor:(_:string)=>{}}}
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.65));renderer.setClearColor(0,0);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;host.append(renderer.domElement);
 scene.add(new T.HemisphereLight(0xe7f6ff,0x34504f,3));const key=new T.DirectionalLight(0xfff3df,5);key.position.set(-3,5,5);scene.add(key);const rim=new T.PointLight(0x5bded0,35);rim.position.set(3,1,-2);scene.add(rim);
 const root=new T.Group();scene.add(root);const white=new T.MeshPhysicalMaterial({color:0xe9eeed,roughness:.23,metalness:.15,clearcoat:1});const black=new T.MeshPhysicalMaterial({color:0x080e14,roughness:.15,metalness:.35,clearcoat:1});const blue=new T.MeshStandardMaterial({color:0x85e9ff,emissive:0x39d9ff,emissiveIntensity:2,roughness:.3});const joint=new T.MeshStandardMaterial({color:0x27393d,metalness:.7,roughness:.4});
 function sphere(parent:T.Object3D,mat:T.Material,x:number,y:number,z:number,sx:number,sy:number,sz:number){const m=new T.Mesh(new T.SphereGeometry(1,40,28),mat);m.position.set(x,y,z);m.scale.set(sx,sy,sz);parent.add(m);return m}
 const body=new T.Group();root.add(body);sphere(body,white,0,-.1,0,.68,.83,.5);sphere(body,joint,0,.58,0,.27,.24,.26);
 const head=new T.Group();head.position.y=1.15;body.add(head);sphere(head,white,0,0,0,1,.79,.67);sphere(head,black,0,-.01,.47,.86,.59,.26);
 const eyes=[sphere(head,blue,-.34,.07,.704,.13,.205,.05),sphere(head,blue,.34,.07,.704,.13,.205,.05)];
 const mouth=sphere(head,blue,0,-.26,.735,.13,.028,.021);
 sphere(head,joint,-1,0,0,.09,.22,.24);sphere(head,joint,1,0,0,.09,.22,.24);
 const antenna=new T.Mesh(new T.CylinderGeometry(.027,.027,.25,12),joint);antenna.position.set(.33,.79,0);head.add(antenna);sphere(head,blue,.33,.94,0,.075,.075,.075);
 const arms=[new T.Group(),new T.Group()];arms.forEach((a,i)=>{a.position.set(i? .72:-.72,.25,0);body.add(a);sphere(a,joint,0,0,0,.15,.16,.16);sphere(a,white,0,-.34,0,.19,.43,.22);sphere(a,white,0,-.66,.04,.19,.17,.2)});
 sphere(body,joint,0,-.12,.49,.14,.14,.035);sphere(body,blue,0,-.12,.52,.08,.08,.025);
 sphere(body,white,-.35,-.91,.06,.25,.22,.38);sphere(body,white,.35,-.91,.06,.25,.22,.38);
 const floor=new T.Mesh(new T.CircleGeometry(1.18,64),new T.MeshBasicMaterial({color:0x5be0cb,transparent:true,opacity:.06}));floor.rotation.x=-Math.PI/2;floor.position.y=-1.42;scene.add(floor);
 const ring=new T.Mesh(new T.TorusGeometry(1.15,.012,8,96),blue);ring.rotation.x=-Math.PI/2;ring.position.y=-1.41;scene.add(ring);
 const shadow=sphere(scene,new T.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.14}),0,-1.4,0,.82,.006,.48);
 let state='idle',pointer=0,active=true;host.addEventListener('pointermove',e=>pointer=((e.clientX-host.getBoundingClientRect().left)/host.clientWidth-.5)*.45);host.addEventListener('pointerleave',()=>pointer=0);
 const resize=()=>{const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix()};new ResizeObserver(resize).observe(host);resize();
 host.addEventListener('webglcontextlost',e=>{e.preventDefault();active=false;onError('3D paused by your browser. Reload to restore it.')});
 document.addEventListener('visibilitychange',()=>{active=!document.hidden});
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let start=performance.now(),last=0;
 function frame(now:number){requestAnimationFrame(frame);if(!active||now-last<33)return;last=now;const t=(now-start)/1000,m=reduced?0:1;
 root.position.y=Math.sin(t*1.8)*.075*m;root.rotation.y+=(pointer+Math.sin(t*.55)*.1-root.rotation.y)*.06;head.rotation.z=Math.sin(t*.8)*.035*m;head.rotation.x=state==='sleep'?.23:state==='thinking'?-.13:Math.sin(t*.7)*.03*m;
 const blink=(t%4.8>4.62)? .08:1;eyes.forEach((eye,i)=>{eye.scale.y=(state==='sleep'?.025:state==='happy'?.1:.205)*blink;eye.rotation.z=state==='sad'?(i?-.25:.25):0});
 mouth.scale.y=state==='speaking'? .035+Math.abs(Math.sin(t*14))*.07:.028;mouth.scale.x=state==='happy'?.19:.13;
 arms.forEach((a,i)=>{a.rotation.z=(i?1:-1)*(.12+Math.sin(t*1.8+i)*.06*m);a.rotation.x=0});
 if(state==='wave'){arms[1].rotation.z=-2.3+Math.sin(t*9)*.32;head.rotation.z=-.09}
 if(state==='dance'){body.rotation.z=Math.sin(t*5)*.19*m;root.position.y+=Math.abs(Math.sin(t*5))*.15*m;arms.forEach((a,i)=>a.rotation.z=(i?1:-1)*(1+Math.sin(t*5)*.6))}else body.rotation.z=0;
 if(state==='listening'){eyes.forEach(e=>e.scale.y*=1.12);ring.scale.setScalar(1+Math.sin(t*4)*.06)}else ring.scale.setScalar(1);
 shadow.scale.x=.82+root.position.y*.2;renderer.render(scene,camera)}requestAnimationFrame(frame);
 return {setState:(s:string)=>state=s,setColor:(c:string)=>{blue.color.set(c);blue.emissive.set(c)}}
}
