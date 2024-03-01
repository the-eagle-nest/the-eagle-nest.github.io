const imageUpload=document.getElementById("imageUpload"),fryLevel=document.getElementById("fryLevel"),fryButton=document.getElementById("fryButton"),friedImage=document.getElementById("friedImage"),downloadLink=document.getElementById("downloadLink"),result=document.getElementById("result"),fileInput=document.getElementById("imageUpload"),isSafari=/^((?!chrome|android).)*safari/i.test(navigator.userAgent);if(isSafari){let e=document.getElementById("result");e.innerHTML="<h2>Safari is not fully supported yet.</h2> <p>Please use a desktop browser or try Chrome, Firefox, or Edge for the best experience.</p>",e.style.display="block"}const browseButton=document.querySelector(".btn-primary");function processImage(e,t){console.log("Entered processImage");let l=document.createElement("canvas"),r=l.getContext("2d"),o=new Image;o.onload=()=>{l.width=o.width,l.height=o.height,r.drawImage(o,0,0);let e=t.split("."),a=e.pop(),i=`${e.join(".")}_${fryLevel.value}.${a}`;setTimeout(()=>{friedImage.src=l.toDataURL("image/jpeg",.5),downloadLink.href=friedImage.src,downloadLink.download=i,result.style.display="block",console.log(friedImage.src)},200),applyFilters(r,l.width,l.height)},o.src=e}function applyFilters(e,t,l){console.log("Entered applyFilters");let r=e.getImageData(0,0,t,l),o=r.data,a={fried:10,overfried:20,burnt:145,"caught-on-fire":300}[fryLevel.value];for(let i=0;i<o.length;i+=4)for(let n=0;n<3;n++){o[i+n]=255/(1+Math.exp(-a*(o[i+n]/255-.5)));let f="burnt"===fryLevel.value?16:"caught-on-fire"===fryLevel.value?8:32;o[i+n]=Math.floor(o[i+n]/(256/f))*(256/f)}let d={fried:.97,overfried:.96,burnt:.95,"caught-on-fire":.94}[fryLevel.value];for(let s=0;s<o.length;s+=4)for(let g=0;g<3;g++)o[s+g]*=d;function $(e,t){let l=e.data,r=e.width,o=e.height,a="overfried"===t?175:340;for(let i=0;i<o;i++)for(let n=0;n<r;n++){let f=a*Math.sin(100*i),d=a*Math.sin(2*n*100),s=Math.floor(n+f),g=Math.floor(i+d);if(s>=0&&s<r&&g>=0&&g<o){let $=(i*r+n)*4,c=(g*r+s)*4;for(let u=0;u<4;u++)l[$+u]=l[c+u]}}}e.putImageData(r,0,0)}function compressImage(e,t,l,r){for(let o=0;o<l;o+=r)for(let a=0;a<t;a+=r)compressBlock(e,t,a,o,r)}function compressBlock(e,t,l,r,o){let a=0,i=0,n=0,f=0;for(let d=0;d<o;d++)for(let s=0;s<o;s++){let g=(t*(r+d)+(l+s))*4;a+=e[g],i+=e[g+1],n+=e[g+2],f++}a=Math.floor(a/f),i=Math.floor(i/f),n=Math.floor(n/f);for(let $=0;$<o;$++)for(let c=0;c<o;c++){let u=(t*(r+$)+(l+c))*4;e[u]=a,e[u+1]=i,e[u+2]=n}ctx.putImageData(imageData,0,0)}browseButton.addEventListener("click",()=>fileInput.click()),fryButton.addEventListener("click",()=>{console.log("Fry button clicked");let e=imageUpload.files[0];if(e){console.log("File selected");let t=new FileReader;t.onload=function(t){let l=t.target.result;,processImage(l,e.name)},t.readAsDataURL(e)}});