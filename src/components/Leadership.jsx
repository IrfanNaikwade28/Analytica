import HOD from "../assets/images/team_pic/HOD.png";
import TVD from "../assets/images/team_pic/TVD.png";
import RAK from "../assets/images/team_pic/RAK.png";

const MEMBERS = [
  { name: "Mr.G.V. Patil", role: "H.O.D", department: "Department of Data Science", icon: "fa-solid fa-crown", photo: HOD },
  { name: "Mrs.T.V. Deokar", role: "Faculty Coordinator", department: "Department of Data Science", icon: "fa-solid fa-user-tie", photo: TVD },
  { name: "Mrs.R. A. Kothiwale", role: "Faculty Coordinator", department: "Department of Data Science", icon: "fa-solid fa-file-pen", photo: RAK }
];

function initials(name){
  return name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);
}

function styleClass(i){
  const styles = ['card-style-1','card-style-2','card-style-3','card-style-4'];
  return styles[i % styles.length];
}

export default function Leadership(){
  return (
    <section id="leadership" className="pt-24 pb-24 px-4 sm:px-6 lg:px-8">
      <span id="team" className="block -mt-24 pt-24" aria-hidden="true"></span>
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-highlight rounded-full"></span>
            <span className="text-sm uppercase tracking-widest text-white/60">Meet Our Leadership</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 uppercase">
            <span className="text-gradient uppercase">Analytica</span> Team
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">The passionate individuals who make Analytica a thriving community of innovation and learning.</p>
        </div>
        <div className="team-grid" id="team-container">
          {MEMBERS.map((m, idx)=> (
            <div key={m.name} className={`individual-card ${styleClass(idx)} reveal`} style={{transitionDelay: `${idx*0.05}s`}}>
              <div className="profile-section relative">
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="profile-photo"
                    loading="lazy"
                    onError={(e)=>{ e.currentTarget.style.display='none'; }}
                  />
                ) : (
                  <div className="profile-initials">{initials(m.name)}</div>
                )}
                <div className="role-icon-overlay"><i className={m.icon}></i></div>
              </div>
              <h3 className="member-name">{m.name}</h3>
              <p className="member-role">{m.role}</p>
              <div className="department-badge">{m.department}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
