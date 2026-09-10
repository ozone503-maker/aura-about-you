"use client";
import{useRef}from"react";
import type{GalleryImage}from"./galleryData";

export default function GalleryCarousel({title,eyebrow,images,compact=false}:{title:string;eyebrow?:string;images:GalleryImage[];compact?:boolean}){
 const rail=useRef<HTMLDivElement>(null);
 const move=(direction:number)=>rail.current?.scrollBy({left:direction*(rail.current.clientWidth*.82),behavior:"smooth"});
 return <section className={`photoCarousel ${compact?"compact":""}`} aria-label={title}>
  <div className="carouselHead"><div>{eyebrow&&<p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2></div><div className="carouselControls"><button onClick={()=>move(-1)} aria-label={`Previous ${title} photos`}>←</button><button onClick={()=>move(1)} aria-label={`Next ${title} photos`}>→</button></div></div>
  <div className="carouselRail" ref={rail}>{images.map((image,index)=><figure key={image.src}><img src={image.src} alt={image.alt} loading={index<2?"eager":"lazy"}/></figure>)}</div>
 </section>
}
