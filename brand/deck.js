/* PRAXIS · DECK CONTROLLER — zero-dependency. Клавиатура + точки + прогресс + reveal. */
class Deck{
  constructor(){
    this.slides=[...document.querySelectorAll('.slide')];
    this.progress=document.getElementById('progress');
    this.dots=document.getElementById('dots');
    this.current=0;
    if(this.dots) this.buildDots();
    this.observe(); this.bindKeys();
    addEventListener('resize',()=>this.sync());
  }
  buildDots(){
    this.slides.forEach((s,i)=>{
      const b=document.createElement('button');
      b.setAttribute('aria-label','Слайд '+(i+1));
      b.onclick=()=>s.scrollIntoView({behavior:'smooth'});
      this.dots.appendChild(b);
    });
    this.dotEls=[...this.dots.children];
  }
  observe(){
    const io=new IntersectionObserver((es)=>{es.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('visible');this.current=this.slides.indexOf(e.target);this.sync();}
    });},{threshold:.55});
    this.slides.forEach(s=>io.observe(s));
  }
  sync(){
    if(this.progress) this.progress.style.width=((this.current+1)/this.slides.length*100)+'%';
    if(this.dotEls) this.dotEls.forEach((d,i)=>d.classList.toggle('active',i===this.current));
  }
  go(i){i=Math.max(0,Math.min(this.slides.length-1,i));this.slides[i].scrollIntoView({behavior:'smooth'});}
  bindKeys(){
    addEventListener('keydown',e=>{
      if(['ArrowDown','ArrowRight',' ','PageDown'].includes(e.key)){e.preventDefault();this.go(this.current+1);}
      if(['ArrowUp','ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();this.go(this.current-1);}
      if(e.key==='Home'){e.preventDefault();this.go(0);}
      if(e.key==='End'){e.preventDefault();this.go(this.slides.length-1);}
    });
  }
}
new Deck();
