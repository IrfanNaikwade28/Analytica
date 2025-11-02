import { useEffect, useState } from "react";

export default function Footer(){
  const [year,setYear] = useState(new Date().getFullYear());
  useEffect(()=>{ setYear(new Date().getFullYear()); },[]);
  return (
    <footer className="py-14 border-t border-white/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 max-w-7xl">
        <div className="flex items-center gap-3">
          <div>
            <div className="analytica-logo">Analytica</div>
            <div className="text-white/60 text-sm" style={{textAlign:'center'}}>
              Analytica – Data Science Student Association (DSSA)
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xl">
          <a href="https://www.instagram.com/dssa.dypcet_official/?igsh=MWlhOTIwaG9ldGgweA%3D%3D#" target="_blank" className="hover:text-highlight transition"><i className="fa-brands fa-instagram"></i></a>
          <a href="#" className="hover:text-highlight transition"><i className="fa-brands fa-linkedin"></i></a>
        </div>
        <div className="text-white/50 text-sm">&copy; <span>{year}</span> Analytica. All rights reserved.</div>
      </div>
    </footer>
  );
}
