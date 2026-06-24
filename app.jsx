import { useState, useRef, useEffect, useCallback } from "react";

// ─── Company Info ─────────────────────────────────────────────────────────────
const CO = {
  name:    "SPMM Transports",
  owner:   "R. Devarajan",
  exp:     "20+ Years Experience",
  age:     "15+ Years in Business",
  phone:   "9003683110",
  email:   "spmmtransports14@gmail.com",
  address: "3/172, South Street, Kavettipatty,\nVallipuram (PO), Namakkal – 637003",
  addressLine: "3/172, South Street, Kavettipatty, Vallipuram (PO), Namakkal – 637003",
};

// ─── Company Logo ─────────────────────────────────────────────────────────────
const LOGO_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAEVCAIAAAAn1hriAAAQAElEQVR4AeydB1wVRxPARYoK2HvvJNZETew1sYGFIvbeosYWa+wK9t67JhrbZ+8aNbH3aNRYoqImauwo2ABB4fvfLRzne4/Hozx8wN1vXGdnZ2dnZ2Zn9/YQU77VHs0CmgU0C+hZIGUK7dEsoFlAs4CeBbTUoGcSjaBZQLNAihRaatCiQLNAorFAQipqLDUEBwfzAvLq1Ss/P78X2qNZQLNAorWAn58fC5nlzKI2Mb8YTg0BAQHICg4JsbG1S2Pv4OCYzjFteg00C2gWSKQWYAmzkFnOLGqWNgs82gShmxrevXtHT6uUKR0d09nZpbayShkWFq0QjUGzgGYBS7cAC5nlzKJmabPAWeYsdiNKf5QaOG+EhIQ4pk1nbW2rJQQjVtOaNAsoFkh0CEubBc4yZ7Gz5KPSPzI1wEQusUuVhuwSFbdG1yygWSBpWIBlzmJnybPwDc4oPDXQDJONjZ1BJo2oWUCzQJK0AEuehc/y15+dlBp45QgLC4NJv1mjaBbQLJC0LcDCZ/mTBHSmKaUGritTpU6j06BVNQskXgtomsfIAix/koBOl5SQUqfR7hd0zKJVNQskIwtw70ASIBWo55ySg4SNta2apOGaBTQLJDcLkARIBepZp7S1s+Njhpqk4ZoFNAskNwuQBEgF6p+VTGlrq32VSG5h8Gnmq41q4RYgFYSEhChKpuRRKhqiWUCzQLK1AKngw4cPyvS1n4NWTKEhmgWStQW4jPwoNSRrY2iT1yygWUBlgTDSQ0RV+rmGCFz7O9lZQJtworCAjY21nZ2tfZrUqVPZgXPy11GbVpoAg606zCZWtdRgoqE0Ns0Cn8ACLHVHB3uAvCCt/9SpwNOldSALiAQBPUP6tJSkDcDRwZ5WQLTGRWMtNcTFelpfzQJmtADrn6VOdtAfQ84CaUgB5Av9VvICTXTXbzKdoqUG022lcWoWSDgLsOZZ/0bGY/0DRhjoHpfsoKUGI7b9NE3aqJoFWPO8Iyh2ePX67cHj51Zv3rft16PXbv5DVWkSyNkL12gSoG4lOyBK8MS01FJDTi2m8WsWMLsF7GxtlDEePHq6but+nzv3374NePL0+bHTFw+eOK+sfxAywoXLN2gSADNdlO5qUQrRFERLDaZYSePRLJCgFrCxiUwNuw6c0BmbFMD6F8eHHfuPU9VhOHTyAilDENWiBMXEUksNJhpKY9MskHAWsLGxFoMpK1xU1SXHBxIERwk1UeBqIqJi906hpQZhzGhKrVmzwCexgH/PKfIOiKoAQAAAABJRU5ErkJggg==";

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  black:    "#0B1220",
  charcoal: "#101A2E",
  dark:     "#16233D",
  navy:     "#0E2A4A",
  blue:     "#1E6FD9",
  blueLt:   "#5B9CEE",
  blueDk:   "#134E96",
  white:    "#FFFFFF",
  offWhite: "#F4F7FB",
  silver:   "#EAEFF6",
  border:   "#D7E1EE",
  text:     "#142233",
  muted:    "#5B6B80",
  success:  "#1A6B3A",
  successBg:"#D6EFE0",
  danger:   "#B92B2B",
  dangerBg: "#FDEAEA",
};

// ─── Default / seed data (used only if DB is empty) ──────────────────────────
const SEED_DATA = {
  customers: [
    { id:"C001", name:"Rajan Kumar",  email:"rajan@email.com",  phone:"9876543210", password:"pass123", address:"Chennai" },
    { id:"C002", name:"Priya Nair",   email:"priya@email.com",  phone:"9876543211", password:"pass123", address:"Coimbatore" },
  ],
  orders: [
    { id:"ORD001", customerId:"C001", customerName:"Rajan Kumar",  phone:"9876543210", pickupLocation:"Chennai",    dropLocation:"Bangalore",  date:"2025-06-10", goodsType:"Electronics", vehicleType:"20ft Container", weight:"2 Tons", status:"Delivered",  driver:"Murugan R", vehicle:"TN01AB1234", amount:12500, notes:"Handle with care", createdAt:"2025-06-05" },
    { id:"ORD002", customerId:"C002", customerName:"Priya Nair",   phone:"9876543211", pickupLocation:"Coimbatore", dropLocation:"Hyderabad",  date:"2025-06-15", goodsType:"Furniture",   vehicleType:"32ft Trailer",   weight:"5 Tons", status:"In Transit", driver:"Selvam K",  vehicle:"TN22CD5678", amount:18000, notes:"",                createdAt:"2025-06-08" },
    { id:"ORD003", customerId:"C001", customerName:"Rajan Kumar",  phone:"9876543210", pickupLocation:"Chennai",    dropLocation:"Madurai",    date:"2025-06-20", goodsType:"FMCG Goods",  vehicleType:"Mini Truck",     weight:"1 Ton",  status:"Confirmed",  driver:"",          vehicle:"",           amount:0,     notes:"",                createdAt:"2025-06-09" },
  ],
  drivers: [
    { id:"D001", name:"Murugan R",  phone:"9944112233", license:"TN0120200012345", available:true  },
    { id:"D002", name:"Selvam K",   phone:"9944112244", license:"TN0120190067890", available:false },
    { id:"D003", name:"Anand V",    phone:"9944112255", license:"TN0120210099001", available:true  },
    { id:"D004", name:"Karthik S",  phone:"9944112266", license:"TN0120220011223", available:true  },
  ],
  vehicles: [
    { id:"V001", number:"TN01AB1234", type:"Mini Truck",      capacity:"1 Ton",   available:true  },
    { id:"V002", number:"TN22CD5678", type:"32ft Trailer",    capacity:"10 Tons", available:false },
    { id:"V003", number:"TN33EF9012", type:"20ft Container",  capacity:"5 Tons",  available:true  },
    { id:"V004", number:"TN44GH3456", type:"Bulker",          capacity:"15 Tons", available:true  },
  ],
};

// ─── Storage Keys ─────────────────────────────────────────────────────────────
const STORAGE_KEYS = {
  customers: "spmm:customers",
  orders:    "spmm:orders",
  drivers:   "spmm:drivers",
  vehicles:  "spmm:vehicles",
};

// ─── Persistent Storage Helpers ───────────────────────────────────────────────
async function loadFromStorage(key, fallback) {
  try {
    const result = await window.storage.get(key);
    if (result && result.value) return JSON.parse(result.value);
  } catch (_) {}
  return fallback;
}

async function saveToStorage(key, value) {
  try {
    await window.storage.set(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage save failed:", e);
  }
}

// ─── Shared styles ────────────────────────────────────────────────────────────
const STATUS_COLORS = {
  "Pending":    { bg:"#FFF6DC", color:"#7A5800", border:"#D4A017" },
  "Confirmed":  { bg:"#DCEAFB", color:"#0A4A6A", border:"#1E6FD9" },
  "In Transit": { bg:"#E6F0FD", color:"#0E2A4A", border:"#134E96" },
  "Delivered":  { bg:"#D6EFE0", color:"#1A6B3A", border:"#2E7D32" },
  "Cancelled":  { bg:"#FDEAEA", color:"#7A1A1A", border:"#C62828" },
};

const VEHICLE_TYPES = ["Mini Truck","20ft Container","32ft Trailer","Bulker","Tanker","Refrigerated Truck"];
const GOODS_TYPES   = ["Electronics","Furniture","FMCG Goods","Machinery","Textiles","Perishables","Chemicals","Construction Materials","Automobiles","Other"];

const inputStyle = {
  width:"100%", padding:"10px 12px",
  border:`1.5px solid ${C.border}`, borderRadius:8,
  fontSize:14, boxSizing:"border-box",
  outline:"none", fontFamily:"inherit",
  background:C.white, color:C.text,
};
const labelStyle = { fontSize:13, fontWeight:700, color:C.dark, display:"block", marginBottom:6 };
const btnPrimary = { display:"block", width:"100%", padding:"12px 0", background:C.blue, border:"none", borderRadius:10, color:C.white, fontWeight:800, fontSize:15, cursor:"pointer", marginTop:6, marginBottom:4, letterSpacing:0.3 };
const linkBtn    = { color:C.blue, background:"none", border:"none", cursor:"pointer", fontWeight:700, padding:0, fontSize:"inherit" };

// ─── Components ───────────────────────────────────────────────────────────────
function Logo({ height = 44, light = false }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
      <div style={{ height, display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:height, height, borderRadius:8, background:C.blue, display:"flex", alignItems:"center", justifyContent:"center", fontSize:height*0.4, fontWeight:900, color:C.white, flexShrink:0 }}>🚛</div>
        <div>
          <div style={{ fontWeight:900, fontSize:height*0.38, color: light ? C.white : C.black, letterSpacing:-0.5, lineHeight:1 }}>SPMM</div>
          <div style={{ fontWeight:600, fontSize:height*0.22, color: light ? C.blueLt : C.blue, letterSpacing:1.5, textTransform:"uppercase", lineHeight:1 }}>Transports</div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const s = STATUS_COLORS[status] || STATUS_COLORS["Pending"];
  return (
    <span style={{ background:s.bg, color:s.color, border:`1px solid ${s.border}`, borderRadius:20, padding:"3px 12px", fontSize:12, fontWeight:700, whiteSpace:"nowrap" }}>
      {status}
    </span>
  );
}

function ErrBox({ children }) {
  return <div style={{ color:C.danger, fontSize:13, margin:"0 0 12px", background:C.dangerBg, padding:"10px 12px", borderRadius:8, fontWeight:600 }}>{children}</div>;
}

function LoadingScreen() {
  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:C.black, fontFamily:"'Segoe UI',system-ui,sans-serif", gap:20 }}>
      <div style={{ fontSize:48 }}>🚛</div>
      <div style={{ fontSize:22, fontWeight:900, color:C.white }}>SPMM Transports</div>
      <div style={{ fontSize:14, color:C.blueLt, display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ display:"inline-block", width:16, height:16, border:`2px solid ${C.blue}`, borderTopColor:"transparent", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
        Loading your data…
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [db, setDb]             = useState(null); // null = loading
  const [view, setView]         = useState("home");
  const [authUser, setAuthUser] = useState(null);
  const [authRole, setAuthRole] = useState(null);
  const [loginError, setLoginError]  = useState("");
  const [loginTab, setLoginTab]      = useState("customer");

  // ── Load DB from persistent storage on mount ─────────────────────────────
  useEffect(() => {
    async function init() {
      const customers = await loadFromStorage(STORAGE_KEYS.customers, SEED_DATA.customers);
      const orders    = await loadFromStorage(STORAGE_KEYS.orders,    SEED_DATA.orders);
      const drivers   = await loadFromStorage(STORAGE_KEYS.drivers,   SEED_DATA.drivers);
      const vehicles  = await loadFromStorage(STORAGE_KEYS.vehicles,  SEED_DATA.vehicles);
      setDb({ customers, orders, drivers, vehicles });
    }
    init();
  }, []);

  // ── Persist any DB change to storage ─────────────────────────────────────
  const updateDb = useCallback((updater) => {
    setDb(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      // Persist changed slices asynchronously
      if (next.customers !== prev.customers) saveToStorage(STORAGE_KEYS.customers, next.customers);
      if (next.orders    !== prev.orders)    saveToStorage(STORAGE_KEYS.orders,    next.orders);
      if (next.drivers   !== prev.drivers)   saveToStorage(STORAGE_KEYS.drivers,   next.drivers);
      if (next.vehicles  !== prev.vehicles)  saveToStorage(STORAGE_KEYS.vehicles,  next.vehicles);
      return next;
    });
  }, []);

  if (!db) return <LoadingScreen />;

  // ── Auth ─────────────────────────────────────────────────────────────────
  const login = (email, password, role) => {
    if (role === "admin") {
      if (email === "admin@spmm.com" && password === "admin123") {
        setAuthUser({ name:"Admin", email }); setAuthRole("admin"); setView("admin"); setLoginError("");
      } else setLoginError("Invalid admin credentials.");
    } else {
      const cust = db.customers.find(c => c.email === email && c.password === password);
      if (cust) { setAuthUser(cust); setAuthRole("customer"); setView("customer-dashboard"); setLoginError(""); }
      else setLoginError("Invalid email or password.");
    }
  };

  const register = (data) => {
    if (db.customers.find(c => c.email === data.email)) return "Email already registered.";
    const newCustomer = { ...data, id:"C"+String(db.customers.length+1).padStart(3,"0") };
    updateDb(prev => ({ ...prev, customers:[...prev.customers, newCustomer] }));
    return null;
  };

  const logout = () => { setAuthUser(null); setAuthRole(null); setView("home"); };

  const addOrder = (order) => {
    const id = "ORD"+String(db.orders.length+1).padStart(3,"0");
    const newOrder = { ...order, id, status:"Pending", driver:"", vehicle:"", amount:0, createdAt:new Date().toISOString().split("T")[0] };
    updateDb(prev => ({ ...prev, orders:[...prev.orders, newOrder] }));
    return id;
  };

  const updateOrderAndDriver = (id, updates) => {
    updateDb(prev => {
      const order = prev.orders.find(o => o.id === id);
      const updatedOrder = { ...order, ...updates };
      let drivers = prev.drivers.map(d => {
        if (d.name === updatedOrder.driver) {
          return { ...d, available: !["Confirmed","In Transit"].includes(updatedOrder.status) };
        }
        if (order.driver && d.name === order.driver && updates.driver !== undefined && updates.driver !== order.driver) {
          return { ...d, available:true };
        }
        return d;
      });
      return { ...prev, orders: prev.orders.map(o => o.id===id ? updatedOrder : o), drivers };
    });
  };

  const updateCustomer = (id, updates) => {
    updateDb(prev => ({ ...prev, customers: prev.customers.map(c => c.id===id ? { ...c, ...updates } : c) }));
    if (authUser?.id === id) setAuthUser(prev => ({ ...prev, ...updates }));
  };

  if (view==="home")               return <HomePage setView={setView} setLoginTab={setLoginTab}/>;
  if (view==="login")              return <LoginPage login={login} register={register} loginError={loginError} setLoginError={setLoginError} loginTab={loginTab} setLoginTab={setLoginTab} setView={setView}/>;
  if (view==="customer-dashboard") return <CustomerDashboard user={authUser} db={db} addOrder={addOrder} logout={logout} updateCustomer={updateCustomer}/>;
  if (view==="admin")              return <AdminDashboard db={db} updateOrder={updateOrderAndDriver} logout={logout}/>;
  return <HomePage setView={setView} setLoginTab={setLoginTab}/>;
}

// ─── Home Page ─────────────────────────────────────────────────────────────────
function HomePage({ setView, setLoginTab }) {
  const stats = [
    { num:"15+", label:"Years in Business" },
    { num:"20+", label:"Years Owner Experience" },
    { num:"500+", label:"Happy Clients" },
    { num:"10,000+", label:"Trips Completed" },
  ];
  const services = [
    { icon:"📦", title:"Full Truck Load (FTL)", desc:"Dedicated truck for your consignment. Faster delivery with no sharing." },
    { icon:"🏗️", title:"Heavy Machinery", desc:"Specialised handling of industrial equipment, machinery and oversized loads." },
    { icon:"🛒", title:"FMCG & Retail Goods", desc:"Temperature-safe, secure transport for consumer and retail goods." },
    { icon:"🪑", title:"Furniture & Household", desc:"Careful packing and transport of furniture, electronics, and home goods." },
    { icon:"⚗️", title:"Chemicals & Industrial", desc:"Certified handling of chemical and industrial cargo with safety protocols." },
    { icon:"❄️", title:"Refrigerated Transport", desc:"Cold-chain logistics for perishables, dairy, pharma and fresh produce." },
  ];
  const whyUs = [
    { icon:"🛡️", title:"Trusted for 15 Years", desc:"Since our founding, we have built a reputation for reliability and on-time delivery across South India." },
    { icon:"👨‍💼", title:"Owner-Led Operations", desc:"Our founder R. Devarajan brings 20+ years of personal expertise to every shipment." },
    { icon:"📍", title:"Real-Time Tracking", desc:"Know exactly where your goods are at every stage." },
    { icon:"🚛", title:"Diverse Modern Fleet", desc:"Mini trucks, 20ft containers, 32ft trailers, bulkers, tankers, refrigerated trucks." },
    { icon:"📞", title:"24 / 7 Support", desc:"Our team is always a call away for booking, updates, or emergency assistance." },
    { icon:"💰", title:"Transparent Pricing", desc:"No hidden charges. Clear quotes upfront so you can plan your logistics budget." },
  ];
  const testimonials = [
    { name:"Senthil Kumar", city:"Erode", text:"SPMM has been our go-to transporter for 8 years. They always deliver on time and handle our machinery with great care." },
    { name:"Kavitha Rajan", city:"Salem", text:"Reliable, affordable and professional. Mr. Devarajan personally called to confirm our delivery. Highly recommended!" },
    { name:"Arun Logistics", city:"Coimbatore", text:"We ship 20+ consignments a month with SPMM. Their tracking system and drivers are top-notch. Never disappointed us." },
  ];

  return (
    <div style={{ minHeight:"100vh", width:"100%", background:C.offWhite, fontFamily:"'Segoe UI',system-ui,sans-serif", boxSizing:"border-box" }}>
      <header style={{ background:C.black, borderBottom:`3px solid ${C.blue}`, position:"sticky", top:0, zIndex:100 }}>
        <div style={{ padding:"0 2rem", display:"flex", alignItems:"center", justifyContent:"space-between", height:72, maxWidth:1200, margin:"0 auto" }}>
          <Logo height={50} light />
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={() => { setLoginTab("customer"); setView("login"); }} style={{ padding:"9px 20px", border:`1.5px solid ${C.blue}`, borderRadius:8, background:"transparent", color:C.blueLt, fontWeight:700, cursor:"pointer", fontSize:14 }}>Customer Login</button>
            <button onClick={() => { setLoginTab("admin"); setView("login"); }} style={{ padding:"9px 20px", border:"none", borderRadius:8, background:C.blue, color:C.white, fontWeight:800, cursor:"pointer", fontSize:14 }}>Admin Login</button>
          </div>
        </div>
      </header>

      <div style={{ background:`linear-gradient(120deg,${C.black} 0%,${C.charcoal} 55%,#0E2A4A 100%)`, color:C.white, padding:"5rem 2rem 4rem", textAlign:"center", borderBottom:`4px solid ${C.blue}` }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <div style={{ display:"inline-block", background:`rgba(30,111,217,0.15)`, border:`1px solid ${C.blue}`, borderRadius:20, padding:"5px 18px", fontSize:13, color:C.blueLt, fontWeight:600, marginBottom:20, letterSpacing:1 }}>
            ✦ NAMAKKAL'S MOST TRUSTED LORRY SERVICE ✦
          </div>
          <h1 style={{ fontSize:"clamp(30px,5.5vw,52px)", fontWeight:900, margin:"0 0 16px", letterSpacing:-1, lineHeight:1.1 }}>
            Fast. Reliable.<br/><span style={{ color:C.blueLt }}>SPMM Transports.</span>
          </h1>
          <p style={{ fontSize:"clamp(14px,2vw,17px)", color:"#A9C2E3", margin:"0 0 12px", lineHeight:1.8 }}>
            Founded by <strong style={{ color:C.blueLt }}>R. Devarajan</strong> with over <strong style={{ color:C.blueLt }}>20 years of industry experience</strong>, SPMM Transports has been delivering goods safely and on time across South India for more than <strong style={{ color:C.blueLt }}>15 years</strong>.
          </p>
          <p style={{ fontSize:14, color:"#8093AC", margin:"0 0 32px" }}>Namakkal · Chennai · Coimbatore · Bangalore · Hyderabad · And beyond</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => { setLoginTab("customer"); setView("login"); }} style={{ padding:"14px 38px", background:C.blue, border:"none", borderRadius:10, color:C.white, fontSize:16, fontWeight:800, cursor:"pointer", boxShadow:`0 4px 20px rgba(30,111,217,0.4)` }}>Book a Lorry →</button>
            <button onClick={() => { setLoginTab("customer"); setView("login"); }} style={{ padding:"14px 38px", background:"rgba(255,255,255,0.08)", border:"1.5px solid rgba(255,255,255,0.3)", borderRadius:10, color:C.white, fontSize:16, fontWeight:600, cursor:"pointer" }}>Track My Order</button>
          </div>
        </div>
      </div>

      <div style={{ background:C.blue, padding:"18px 2rem" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:12, textAlign:"center" }}>
          {stats.map(s => (
            <div key={s.num}>
              <div style={{ fontWeight:900, fontSize:"clamp(22px,3.5vw,32px)", color:C.white, lineHeight:1 }}>{s.num}</div>
              <div style={{ fontWeight:600, fontSize:13, color:"#E4EEFB", marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:"4rem auto", padding:"0 2rem", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:28 }}>
        <div>
          <div style={{ fontSize:12, color:C.blue, fontWeight:700, letterSpacing:2, marginBottom:8, textTransform:"uppercase" }}>About Us</div>
          <h2 style={{ fontSize:"clamp(22px,3vw,30px)", fontWeight:900, color:C.black, margin:"0 0 16px" }}>A Family of Transporters You Can Trust</h2>
          <p style={{ color:C.muted, lineHeight:1.8, fontSize:15, marginBottom:14 }}>SPMM Transports was established by <strong style={{color:C.text}}>R. Devarajan</strong>, a logistics veteran with over two decades of hands-on experience in road freight across Tamil Nadu and beyond.</p>
          <p style={{ color:C.muted, lineHeight:1.8, fontSize:15 }}>Based in <strong style={{color:C.text}}>Namakkal, the lorry capital of India</strong> — giving us unmatched network access and competitive rates.</p>
        </div>
        <div style={{ background:C.black, borderRadius:16, padding:28, color:C.white, border:`2px solid ${C.blue}` }}>
          <div style={{ fontSize:36, marginBottom:12 }}>👨‍💼</div>
          <h3 style={{ fontSize:22, fontWeight:900, color:C.blueLt, margin:"0 0 6px" }}>R. Devarajan</h3>
          <div style={{ fontSize:13, color:"#9AB2CE", marginBottom:16, letterSpacing:0.5 }}>FOUNDER & OWNER · SPMM TRANSPORTS</div>
          {[["20+ Years","Personal experience in road logistics"],["15+ Years","SPMM Transports in operation"],["Namakkal HQ","Lorry capital of India"],["Pan South India","Service network coverage"]].map(([k,v]) => (
            <div key={k} style={{ display:"flex", gap:12, marginBottom:12, alignItems:"flex-start" }}>
              <div style={{ background:C.blue, color:C.white, borderRadius:6, padding:"2px 10px", fontSize:12, fontWeight:800, whiteSpace:"nowrap", flexShrink:0 }}>{k}</div>
              <div style={{ fontSize:13, color:"#A9C2E3", lineHeight:1.5 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background:C.black, padding:"4rem 2rem", borderTop:`3px solid ${C.blue}`, borderBottom:`3px solid ${C.blue}` }}>
        <div style={{ maxWidth:1050, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ fontSize:12, color:C.blue, fontWeight:700, letterSpacing:2, marginBottom:8, textTransform:"uppercase" }}>What We Carry</div>
            <h2 style={{ fontSize:"clamp(22px,3.5vw,32px)", fontWeight:900, color:C.white, margin:0 }}>Our Transport Services</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:18 }}>
            {services.map(s => (
              <div key={s.title} style={{ background:C.charcoal, borderRadius:12, padding:"22px 20px", border:`1px solid #1C2C47`, borderLeft:`4px solid ${C.blue}` }}>
                <div style={{ fontSize:32, marginBottom:10 }}>{s.icon}</div>
                <h3 style={{ fontWeight:800, fontSize:16, color:C.white, margin:"0 0 8px" }}>{s.title}</h3>
                <p style={{ color:"#92A6BF", fontSize:14, margin:0, lineHeight:1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1050, margin:"4rem auto", padding:"0 2rem" }}>
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <div style={{ fontSize:12, color:C.blue, fontWeight:700, letterSpacing:2, marginBottom:8, textTransform:"uppercase" }}>Why Choose Us</div>
          <h2 style={{ fontSize:"clamp(22px,3.5vw,32px)", fontWeight:900, color:C.black, margin:0 }}>The SPMM Difference</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:18 }}>
          {whyUs.map(w => (
            <div key={w.title} style={{ background:C.white, borderRadius:12, padding:"22px 20px", boxShadow:"0 2px 14px rgba(0,0,0,0.07)", border:`1px solid ${C.border}` }}>
              <div style={{ fontSize:32, marginBottom:10 }}>{w.icon}</div>
              <h3 style={{ fontWeight:800, fontSize:15, color:C.black, margin:"0 0 8px" }}>{w.title}</h3>
              <p style={{ color:C.muted, fontSize:14, margin:0, lineHeight:1.65 }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background:C.silver, padding:"4rem 2rem", borderTop:`2px solid ${C.border}` }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{ fontSize:12, color:C.blue, fontWeight:700, letterSpacing:2, marginBottom:8, textTransform:"uppercase" }}>Customer Stories</div>
            <h2 style={{ fontSize:"clamp(22px,3.5vw,30px)", fontWeight:900, color:C.black, margin:0 }}>What Our Clients Say</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:18 }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background:C.white, borderRadius:14, padding:"24px 22px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:`1px solid ${C.border}` }}>
                <div style={{ fontSize:32, color:C.blue, lineHeight:1, marginBottom:10 }}>"</div>
                <p style={{ color:C.text, fontSize:14, lineHeight:1.75, margin:"0 0 18px", fontStyle:"italic" }}>{t.text}</p>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:C.blue, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, color:C.white, fontSize:15 }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontWeight:700, color:C.black, fontSize:14 }}>{t.name}</div>
                    <div style={{ fontSize:12, color:C.muted }}>{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background:C.charcoal, padding:"3rem 2rem", borderTop:`3px solid ${C.blue}` }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:24 }}>
          {[["📞","Call Us",`+91 ${CO.phone}`],["✉️","Email Us",CO.email],["📍","Visit Us",CO.addressLine]].map(([icon,label,val]) => (
            <div key={label} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
              <span style={{ fontSize:26, flexShrink:0 }}>{icon}</span>
              <div>
                <div style={{ fontSize:11, color:C.blueLt, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", marginBottom:4 }}>{label}</div>
                <div style={{ color:"#DDE6F2", fontSize:14, fontWeight:600, lineHeight:1.5 }}>{val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ background:C.black, borderTop:`1px solid #1C2C47`, padding:"36px 2rem" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"flex", flexDirection:"column", alignItems:"center", gap:18, textAlign:"center" }}>
          <Logo height={48} light />
          <button onClick={() => { setLoginTab("customer"); setView("login"); }} style={{ padding:"9px 24px", border:`1.5px solid ${C.blue}`, borderRadius:8, background:"transparent", color:C.blueLt, fontWeight:700, cursor:"pointer", fontSize:14 }}>Customer Login</button>
          <p style={{ margin:0, fontSize:12, color:"#5E7493" }}>© {new Date().getFullYear()} {CO.name} · Proprietor: {CO.owner} · Namakkal, Tamil Nadu</p>
        </div>
      </footer>
    </div>
  );
}

// ─── Login Page ────────────────────────────────────────────────────────────────
function LoginPage({ login, register, loginError, setLoginError, loginTab, setLoginTab, setView }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [regMode, setRegMode]   = useState(false);
  const [regData, setRegData]   = useState({ name:"", email:"", phone:"", address:"", password:"" });
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);

  const handleLogin    = (e) => { e.preventDefault(); login(email, password, loginTab); };
  const handleRegister = (e) => {
    e.preventDefault();
    const err = register(regData);
    if (err) setRegError(err); else { setRegSuccess(true); setRegError(""); }
  };

  return (
    <div style={{ minHeight:"100vh", width:"100%", background:`linear-gradient(160deg,${C.black} 0%,${C.charcoal} 100%)`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"'Segoe UI',system-ui,sans-serif", boxSizing:"border-box" }}>
      <div style={{ marginBottom:24 }}><Logo height={56} light /></div>
      <div style={{ background:C.white, borderRadius:18, padding:"32px 36px", width:"100%", maxWidth:430, boxShadow:"0 24px 64px rgba(0,0,0,0.5)" }}>
        {!regMode ? (
          <>
            <div style={{ display:"flex", marginBottom:24, border:`1.5px solid ${C.border}`, borderRadius:10, overflow:"hidden" }}>
              {["customer","admin"].map(tab => (
                <button key={tab} onClick={() => { setLoginTab(tab); setLoginError(""); }} style={{ flex:1, padding:"11px 0", border:"none", background:loginTab===tab?C.blue:C.white, color:loginTab===tab?C.white:C.muted, fontWeight:700, cursor:"pointer", fontSize:14 }}>
                  {tab==="admin" ? "🔐 Admin" : "👤 Customer"}
                </button>
              ))}
            </div>
            <h2 style={{ margin:"0 0 4px", fontSize:22, fontWeight:900, color:C.black }}>{loginTab==="admin"?"Admin Login":"Customer Login"}</h2>
            <p style={{ margin:"0 0 18px", fontSize:13, color:C.muted }}>{loginTab==="admin"?"Manage orders, fleet and drivers.":"Book lorries and track your orders."}</p>
            {loginTab==="admin"    && <div style={{ fontSize:12, color:C.muted, marginBottom:14, background:"#FFF8DC", padding:"10px 12px", borderRadius:8 }}>Demo: admin@spmm.com / admin123</div>}
            {loginTab==="customer" && <div style={{ fontSize:12, color:C.muted, marginBottom:14, background:"#EAF2FE", padding:"10px 12px", borderRadius:8 }}>Demo: rajan@email.com / pass123</div>}
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom:14 }}>
                <label style={labelStyle}>Email Address</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required placeholder="Enter email" style={inputStyle}/>
              </div>
              <div style={{ marginBottom:18 }}>
                <label style={labelStyle}>Password</label>
                <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required placeholder="Enter password" style={inputStyle}/>
              </div>
              {loginError && <ErrBox>{loginError}</ErrBox>}
              <button type="submit" style={btnPrimary}>Login</button>
            </form>
            {loginTab==="customer" && (
              <p style={{ textAlign:"center", marginTop:14, fontSize:14, color:C.muted }}>
                New customer? <button onClick={()=>setRegMode(true)} style={linkBtn}>Register here</button>
              </p>
            )}
            <p style={{ textAlign:"center", marginTop:6, fontSize:14 }}>
              <button onClick={()=>setView("home")} style={{ ...linkBtn, color:C.muted }}>← Back to home</button>
            </p>
          </>
        ) : regSuccess ? (
          <div style={{ textAlign:"center", padding:"16px 0" }}>
            <div style={{ fontSize:52, marginBottom:12 }}>✅</div>
            <h3 style={{ color:C.success, fontWeight:900, fontSize:20 }}>Registration Successful!</h3>
            <p style={{ color:C.muted, fontSize:14 }}>You can now login with your credentials.</p>
            <button onClick={()=>{ setRegMode(false); setRegSuccess(false); }} style={btnPrimary}>Go to Login</button>
          </div>
        ) : (
          <>
            <h2 style={{ margin:"0 0 18px", fontSize:22, fontWeight:900, color:C.black }}>Create Account</h2>
            <form onSubmit={handleRegister}>
              {[["Full Name","name","text"],["Email Address","email","email"],["Phone Number","phone","tel"],["City / Address","address","text"],["Password","password","password"]].map(([label,key,type]) => (
                <div key={key} style={{ marginBottom:14 }}>
                  <label style={labelStyle}>{label}</label>
                  <input value={regData[key]} onChange={e=>setRegData(p=>({...p,[key]:e.target.value}))} type={type} required style={inputStyle}/>
                </div>
              ))}
              {regError && <ErrBox>{regError}</ErrBox>}
              <button type="submit" style={btnPrimary}>Create Account</button>
            </form>
            <p style={{ textAlign:"center", marginTop:12, fontSize:14, color:C.muted }}>
              Already registered? <button onClick={()=>setRegMode(false)} style={linkBtn}>Login</button>
            </p>
          </>
        )}
      </div>
      <p style={{ color:"#5E7493", fontSize:12, marginTop:18 }}>© {new Date().getFullYear()} SPMM Transports · Namakkal</p>
    </div>
  );
}

// ─── Customer Dashboard ────────────────────────────────────────────────────────
function CustomerDashboard({ user, db, addOrder, logout, updateCustomer }) {
  const [tab, setTab]         = useState("book");
  const [bookSuccess, setBookSuccess] = useState(null);
  const [localUser, setLocalUser]     = useState(user);

  const myOrders = db.orders.filter(o => o.customerId === localUser.id);

  const tabs = [
    { key:"book",    label:"📦 Book Lorry" },
    { key:"orders",  label:"📋 My Orders" },
    { key:"profile", label:"👤 My Profile" },
    { key:"contact", label:"📞 Contact" },
  ];

  return (
    <div style={{ minHeight:"100vh", width:"100%", background:C.offWhite, fontFamily:"'Segoe UI',system-ui,sans-serif", boxSizing:"border-box" }}>
      <nav style={{ background:C.black, borderBottom:`3px solid ${C.blue}`, padding:"0 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
        <Logo height={42} light />
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontSize:13, color:"#9AB2CE" }}>👤 <strong style={{ color:C.blueLt }}>{localUser.name}</strong></span>
          <button onClick={logout} style={{ padding:"6px 16px", background:C.danger, border:"none", borderRadius:8, color:C.white, fontSize:13, fontWeight:700, cursor:"pointer" }}>Logout</button>
        </div>
      </nav>

      <div style={{ maxWidth:980, margin:"0 auto", padding:"24px 14px" }}>
        <div style={{ marginBottom:20 }}>
          <h2 style={{ margin:0, fontSize:20, fontWeight:900, color:C.black }}>Hello, {localUser.name.split(" ")[0]} 👋</h2>
          <p style={{ margin:"4px 0 0", fontSize:14, color:C.muted }}>Manage your bookings and profile below.</p>
        </div>

        <div style={{ display:"flex", gap:0, marginBottom:22, border:`1.5px solid ${C.border}`, borderRadius:12, overflow:"hidden", background:C.white }}>
          {tabs.map(t => (
            <button key={t.key} onClick={()=>{ setTab(t.key); if(t.key!=="orders") setBookSuccess(null); }} style={{ flex:1, padding:"12px 4px", border:"none", borderRight:`1px solid ${C.border}`, background:tab===t.key?C.blue:C.white, color:tab===t.key?C.white:C.muted, fontWeight:700, cursor:"pointer", fontSize:"clamp(11px,2vw,14px)" }}>
              {t.label}
            </button>
          ))}
        </div>

        {tab==="book"    && <BookingForm user={localUser} addOrder={addOrder} onSuccess={id=>{ setBookSuccess(id); setTab("orders"); }}/>}
        {tab==="orders"  && <MyOrders orders={myOrders} newId={bookSuccess}/>}
        {tab==="profile" && <CustomerProfile user={localUser} updateCustomer={updateCustomer} setLocalUser={setLocalUser}/>}
        {tab==="contact" && <ContactPage/>}
      </div>
    </div>
  );
}

// ─── Customer Profile ──────────────────────────────────────────────────────────
function CustomerProfile({ user, updateCustomer, setLocalUser }) {
  const [form, setForm]   = useState({ name:user.name, phone:user.phone, address:user.address, password:"" });
  const [saved, setSaved] = useState(false);
  const [err, setErr]     = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setErr("Name cannot be empty."); return; }
    const updates = { name:form.name, phone:form.phone, address:form.address };
    if (form.password) updates.password = form.password;
    updateCustomer(user.id, updates);
    setLocalUser(prev => ({ ...prev, ...updates }));
    setSaved(true); setErr("");
    setTimeout(()=>setSaved(false), 3000);
  };

  return (
    <div style={{ background:C.white, borderRadius:16, padding:28, boxShadow:"0 2px 14px rgba(0,0,0,0.07)", border:`1px solid ${C.border}` }}>
      <h2 style={{ margin:"0 0 4px", fontSize:22, fontWeight:900, color:C.black }}>My Profile</h2>
      <p style={{ margin:"0 0 24px", fontSize:14, color:C.muted }}>Update your details. Leave Password blank to keep it unchanged.</p>
      <form onSubmit={handleSave}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"0 20px" }}>
          <div style={{ marginBottom:16 }}>
            <label style={labelStyle}>Full Name</label>
            <input value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} required style={inputStyle}/>
          </div>
          <div style={{ marginBottom:16 }}>
            <label style={labelStyle}>Phone Number</label>
            <input value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} type="tel" style={inputStyle}/>
          </div>
          <div style={{ marginBottom:16 }}>
            <label style={labelStyle}>City / Address</label>
            <input value={form.address} onChange={e=>setForm(p=>({...p,address:e.target.value}))} style={inputStyle}/>
          </div>
          <div style={{ marginBottom:16 }}>
            <label style={labelStyle}>New Password (optional)</label>
            <input value={form.password} onChange={e=>setForm(p=>({...p,password:e.target.value}))} type="password" placeholder="Leave blank to keep current" style={inputStyle}/>
          </div>
        </div>
        <div style={{ marginBottom:20 }}>
          <label style={labelStyle}>Email Address</label>
          <input value={user.email} disabled style={{ ...inputStyle, background:C.silver, color:C.muted }}/>
          <p style={{ fontSize:12, color:C.muted, margin:"4px 0 0" }}>Email cannot be changed. Contact admin if needed.</p>
        </div>
        {err && <ErrBox>{err}</ErrBox>}
        {saved && <div style={{ background:C.successBg, color:C.success, padding:"10px 14px", borderRadius:8, marginBottom:14, fontWeight:600, fontSize:14 }}>✅ Profile updated and saved!</div>}
        <button type="submit" style={btnPrimary}>Save Changes</button>
      </form>
    </div>
  );
}

// ─── Booking Form ─────────────────────────────────────────────────────────────
function BookingForm({ user, addOrder, onSuccess }) {
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate()+1);
  const minDate  = tomorrow.toISOString().split("T")[0];

  const phoneRef   = useRef(user.phone||"");
  const pickupRef  = useRef("");
  const dropRef    = useRef("");
  const weightRef  = useRef("");
  const notesRef   = useRef("");

  const [date, setDate]       = useState("");
  const [goodsType, setGoods] = useState("");
  const [vehicleType, setVehicle] = useState("");
  const [errors, setErrors]   = useState({});

  const validate = () => {
    const e = {};
    if (!phoneRef.current.trim())   e.phone          = "Required";
    if (!pickupRef.current.trim())  e.pickupLocation = "Required";
    if (!dropRef.current.trim())    e.dropLocation   = "Required";
    if (!date)                       e.date           = "Required";
    if (!goodsType)                  e.goodsType      = "Required";
    if (!vehicleType)                e.vehicleType    = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSuccess(addOrder({
      customerId: user.id, customerName: user.name,
      phone: phoneRef.current, pickupLocation: pickupRef.current,
      dropLocation: dropRef.current, date, goodsType, vehicleType,
      weight: weightRef.current, notes: notesRef.current,
    }));
  };

  return (
    <div style={{ background:C.white, borderRadius:16, padding:28, boxShadow:"0 2px 14px rgba(0,0,0,0.07)", border:`1px solid ${C.border}` }}>
      <h2 style={{ margin:"0 0 6px", fontSize:22, fontWeight:900, color:C.black }}>Book a Lorry</h2>
      <p style={{ color:C.muted, fontSize:14, margin:"0 0 24px" }}>Fill in the details and we'll confirm your booking shortly.</p>
      <form onSubmit={handleSubmit}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"0 20px" }}>
          <div style={{ marginBottom:18 }}>
            <label style={labelStyle}>Your Name</label>
            <input value={user.name} disabled style={{ ...inputStyle, background:C.silver, color:C.muted }}/>
          </div>
          <div style={{ marginBottom:18 }}>
            <label style={labelStyle}>Phone Number{errors.phone && <span style={{ color:C.danger }}> *</span>}</label>
            <input defaultValue={phoneRef.current} onChange={e=>{ phoneRef.current=e.target.value; }} type="tel" inputMode="numeric" maxLength={15} style={inputStyle} placeholder="98765 XXXXX"/>
            {errors.phone && <p style={{ color:C.danger, fontSize:12, margin:"4px 0 0" }}>{errors.phone}</p>}
          </div>
          <div style={{ marginBottom:18 }}>
            <label style={labelStyle}>Pickup Location{errors.pickupLocation && <span style={{ color:C.danger }}> *</span>}</label>
            <input defaultValue={pickupRef.current} onChange={e=>{ pickupRef.current=e.target.value; }} style={inputStyle} placeholder="City / Address"/>
            {errors.pickupLocation && <p style={{ color:C.danger, fontSize:12, margin:"4px 0 0" }}>{errors.pickupLocation}</p>}
          </div>
          <div style={{ marginBottom:18 }}>
            <label style={labelStyle}>Drop Location{errors.dropLocation && <span style={{ color:C.danger }}> *</span>}</label>
            <input defaultValue={dropRef.current} onChange={e=>{ dropRef.current=e.target.value; }} style={inputStyle} placeholder="City / Address"/>
            {errors.dropLocation && <p style={{ color:C.danger, fontSize:12, margin:"4px 0 0" }}>{errors.dropLocation}</p>}
          </div>
          <div style={{ marginBottom:18 }}>
            <label style={labelStyle}>Preferred Date{errors.date && <span style={{ color:C.danger }}> *</span>}</label>
            <input value={date} onChange={e=>setDate(e.target.value)} type="date" min={minDate} style={inputStyle}/>
            {errors.date && <p style={{ color:C.danger, fontSize:12, margin:"4px 0 0" }}>{errors.date}</p>}
          </div>
          <div style={{ marginBottom:18 }}>
            <label style={labelStyle}>Approximate Weight</label>
            <input defaultValue={weightRef.current} onChange={e=>{ weightRef.current=e.target.value; }} style={inputStyle} placeholder="e.g. 2 Tons"/>
          </div>
          <div style={{ marginBottom:18 }}>
            <label style={labelStyle}>Type of Goods{errors.goodsType && <span style={{ color:C.danger }}> *</span>}</label>
            <select value={goodsType} onChange={e=>setGoods(e.target.value)} style={inputStyle}>
              <option value="">Select goods type</option>
              {GOODS_TYPES.map(g=><option key={g} value={g}>{g}</option>)}
            </select>
            {errors.goodsType && <p style={{ color:C.danger, fontSize:12, margin:"4px 0 0" }}>{errors.goodsType}</p>}
          </div>
          <div style={{ marginBottom:18 }}>
            <label style={labelStyle}>Type of Vehicle{errors.vehicleType && <span style={{ color:C.danger }}> *</span>}</label>
            <select value={vehicleType} onChange={e=>setVehicle(e.target.value)} style={inputStyle}>
              <option value="">Select vehicle type</option>
              {VEHICLE_TYPES.map(v=><option key={v} value={v}>{v}</option>)}
            </select>
            {errors.vehicleType && <p style={{ color:C.danger, fontSize:12, margin:"4px 0 0" }}>{errors.vehicleType}</p>}
          </div>
        </div>
        <div style={{ marginBottom:18 }}>
          <label style={labelStyle}>Additional Notes / Special Instructions</label>
          <textarea defaultValue={notesRef.current} onChange={e=>{ notesRef.current=e.target.value; }} rows={4} style={{ ...inputStyle, resize:"vertical", minHeight:90 }} placeholder="Any special handling instructions, fragile items, pickup contact details, etc."/>
        </div>
        <button type="submit" style={btnPrimary}>Submit Booking →</button>
      </form>
    </div>
  );
}

// ─── My Orders ─────────────────────────────────────────────────────────────────
function MyOrders({ orders, newId }) {
  const [selected, setSelected] = useState(null);
  return (
    <div>
      {newId && (
        <div style={{ background:C.successBg, border:`1px solid #B2DFCC`, borderRadius:12, padding:"16px 20px", marginBottom:20, color:C.success, fontWeight:700 }}>
          ✅ Booking submitted! Order ID: <strong>{newId}</strong>. Our team will confirm shortly.
        </div>
      )}
      <h2 style={{ margin:"0 0 18px", fontSize:22, fontWeight:900, color:C.black }}>My Orders</h2>
      {orders.length===0 ? (
        <div style={{ textAlign:"center", padding:"48px 0", color:C.muted, background:C.white, borderRadius:12, border:`1px solid ${C.border}` }}>
          <div style={{ fontSize:48 }}>📋</div>
          <p style={{ marginTop:12, fontSize:16 }}>No orders yet. Book your first lorry!</p>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[...orders].reverse().map(order => (
            <div key={order.id} style={{ background:C.white, borderRadius:12, padding:20, boxShadow:"0 2px 8px rgba(0,0,0,0.05)", border:`1px solid ${C.border}`, cursor:"pointer" }} onClick={()=>setSelected(selected?.id===order.id?null:order)}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:8 }}>
                <div>
                  <div style={{ fontWeight:800, fontSize:15, color:C.black }}>{order.id} — {order.vehicleType}</div>
                  <div style={{ fontSize:13, color:C.muted, marginTop:4 }}>🚛 {order.pickupLocation} → {order.dropLocation}</div>
                  <div style={{ fontSize:13, color:C.muted, marginTop:2 }}>📅 {order.date} · 📦 {order.goodsType}</div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6 }}>
                  <StatusBadge status={order.status}/>
                  {order.amount>0 && <span style={{ fontWeight:800, color:C.black, fontSize:17 }}>₹{order.amount.toLocaleString()}</span>}
                </div>
              </div>
              {selected?.id===order.id && (
                <div style={{ marginTop:14, paddingTop:14, borderTop:`1px solid ${C.border}` }}>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"6px 16px", fontSize:13, color:C.text }}>
                    {order.driver  && <div>👨‍✈️ <strong>Driver:</strong> {order.driver}</div>}
                    {order.vehicle && <div>🚛 <strong>Vehicle:</strong> {order.vehicle}</div>}
                    {order.weight  && <div>⚖️ <strong>Weight:</strong> {order.weight}</div>}
                    {order.notes   && <div style={{ gridColumn:"1/-1" }}>📝 <strong>Notes:</strong> {order.notes}</div>}
                    <div>📅 <strong>Booked on:</strong> {order.createdAt}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Contact Page ──────────────────────────────────────────────────────────────
function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
      <div style={{ background:C.white, borderRadius:16, padding:28, boxShadow:"0 2px 14px rgba(0,0,0,0.07)", border:`1px solid ${C.border}` }}>
        <h2 style={{ margin:"0 0 20px", fontSize:22, fontWeight:900, color:C.black }}>Contact Us</h2>
        {[["📞","Phone",`+91 ${CO.phone}`],["✉️","Email",CO.email],["🏢","Office",CO.addressLine],["⏰","Working Hours","Mon–Sat, 8 AM – 8 PM"],["👨‍💼","Owner","R. Devarajan · "+CO.exp]].map(([icon,label,val]) => (
          <div key={label} style={{ display:"flex", gap:12, marginBottom:18, alignItems:"flex-start" }}>
            <span style={{ fontSize:22, flexShrink:0 }}>{icon}</span>
            <div>
              <div style={{ fontWeight:600, fontSize:12, color:C.muted, marginBottom:2, textTransform:"uppercase", letterSpacing:0.5 }}>{label}</div>
              <div style={{ fontWeight:600, color:C.text, fontSize:14, lineHeight:1.5 }}>{val}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background:C.white, borderRadius:16, padding:28, boxShadow:"0 2px 14px rgba(0,0,0,0.07)", border:`1px solid ${C.border}` }}>
        <h2 style={{ margin:"0 0 16px", fontSize:22, fontWeight:900, color:C.black }}>Send a Message</h2>
        {sent ? (
          <div style={{ textAlign:"center", padding:"32px 0" }}>
            <div style={{ fontSize:48 }}>✅</div>
            <p style={{ color:C.success, fontWeight:700, marginTop:12 }}>Message sent! We'll get back to you soon.</p>
            <button onClick={()=>setSent(false)} style={btnPrimary}>Send Another</button>
          </div>
        ) : (
          <form onSubmit={e=>{ e.preventDefault(); setSent(true); }}>
            <div style={{ marginBottom:14 }}>
              <label style={labelStyle}>Subject</label>
              <input required style={inputStyle}/>
            </div>
            <div style={{ marginBottom:18 }}>
              <label style={labelStyle}>Message</label>
              <textarea rows={5} required style={{ ...inputStyle, resize:"vertical", minHeight:100 }}/>
            </div>
            <button type="submit" style={btnPrimary}>Send Message →</button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Admin Dashboard ───────────────────────────────────────────────────────────
function AdminDashboard({ db, updateOrder, logout }) {
  const [tab, setTab]             = useState("orders");
  const [filterStatus, setFilter] = useState("All");

  const statuses = ["All","Pending","Confirmed","In Transit","Delivered","Cancelled"];
  const counts = {
    total:     db.orders.length,
    pending:   db.orders.filter(o=>o.status==="Pending").length,
    inTransit: db.orders.filter(o=>o.status==="In Transit").length,
    delivered: db.orders.filter(o=>o.status==="Delivered").length,
  };
  const tabs = [
    { key:"orders",    label:"📋 Orders" },
    { key:"customers", label:"👥 Customers" },
    { key:"fleet",     label:"🚛 Fleet" },
    { key:"drivers",   label:"👨‍✈️ Drivers" },
  ];

  return (
    <div style={{ minHeight:"100vh", width:"100%", background:C.offWhite, fontFamily:"'Segoe UI',system-ui,sans-serif", boxSizing:"border-box" }}>
      <nav style={{ background:C.black, borderBottom:`3px solid ${C.blue}`, padding:"0 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", height:64, position:"sticky", top:0, zIndex:100 }}>
        <Logo height={42} light />
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <span style={{ color:"#9AB2CE", fontSize:13 }}>🔐 Admin Panel</span>
          <button onClick={logout} style={{ padding:"6px 16px", background:C.danger, border:"none", borderRadius:8, color:C.white, fontSize:13, fontWeight:700, cursor:"pointer" }}>Logout</button>
        </div>
      </nav>

      <div style={{ maxWidth:1120, margin:"0 auto", padding:"24px 14px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:12, marginBottom:24 }}>
          {[["Total Orders",counts.total,C.blue,"📦"],["Pending",counts.pending,"#D97706","⏳"],["In Transit",counts.inTransit,C.blueDk,"🚛"],["Delivered",counts.delivered,C.success,"✅"]].map(([label,val,color,icon]) => (
            <div key={label} style={{ background:C.white, borderRadius:12, padding:"18px 20px", boxShadow:"0 2px 8px rgba(0,0,0,0.06)", border:`1px solid ${C.border}`, borderLeft:`4px solid ${color}` }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.muted, letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>{icon} {label}</div>
              <div style={{ fontSize:28, fontWeight:900, color:C.black }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", gap:0, marginBottom:18, border:`1.5px solid ${C.border}`, borderRadius:12, overflow:"hidden", background:C.white }}>
          {tabs.map(t => (
            <button key={t.key} onClick={()=>setTab(t.key)} style={{ flex:1, padding:"12px 4px", border:"none", borderRight:`1px solid ${C.border}`, background:tab===t.key?C.black:C.white, color:tab===t.key?C.blueLt:C.muted, fontWeight:700, cursor:"pointer", fontSize:"clamp(11px,2vw,13px)" }}>
              {t.label}
            </button>
          ))}
        </div>

        {tab==="orders" && (
          <>
            <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
              {statuses.map(s => (
                <button key={s} onClick={()=>setFilter(s)} style={{ padding:"6px 16px", border:`1.5px solid`, borderColor:filterStatus===s?C.blue:C.border, borderRadius:20, background:filterStatus===s?C.blue:C.white, color:filterStatus===s?C.white:C.muted, fontSize:13, fontWeight:700, cursor:"pointer" }}>{s}</button>
              ))}
            </div>
            <AdminOrders orders={db.orders.filter(o=>filterStatus==="All"||o.status===filterStatus)} drivers={db.drivers} vehicles={db.vehicles} updateOrder={updateOrder}/>
          </>
        )}
        {tab==="customers" && <AdminCustomers customers={db.customers} orders={db.orders}/>}
        {tab==="fleet"     && <AdminFleet vehicles={db.vehicles}/>}
        {tab==="drivers"   && <AdminDrivers drivers={db.drivers}/>}
      </div>
    </div>
  );
}

function AdminOrders({ orders, drivers, vehicles, updateOrder }) {
  const [editing, setEditing]   = useState(null);
  const [editData, setEditData] = useState({});
  const [saved, setSaved]       = useState(null);

  const startEdit = (order) => { setEditing(order.id); setEditData({ status:order.status, driver:order.driver, vehicle:order.vehicle, amount:order.amount }); setSaved(null); };
  const saveEdit  = (id)    => { updateOrder(id, editData); setEditing(null); setSaved(id); setTimeout(()=>setSaved(null), 3000); };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      {orders.length===0 && <div style={{ textAlign:"center", padding:40, color:C.muted, background:C.white, borderRadius:12, fontSize:16, border:`1px solid ${C.border}` }}>No orders found.</div>}
      {saved && <div style={{ background:C.successBg, color:C.success, padding:"12px 16px", borderRadius:10, fontWeight:700, fontSize:14 }}>✅ Order saved to database!</div>}
      {[...orders].reverse().map(order => (
        <div key={order.id} style={{ background:C.white, borderRadius:12, padding:20, boxShadow:"0 2px 8px rgba(0,0,0,0.05)", border:`1px solid ${C.border}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12 }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", marginBottom:8 }}>
                <span style={{ fontWeight:900, fontSize:15, color:C.black }}>{order.id}</span>
                <StatusBadge status={order.status}/>
                <span style={{ fontSize:12, color:C.muted }}>Booked: {order.createdAt}</span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"4px 16px", fontSize:13, color:C.text }}>
                <div>👤 <strong>{order.customerName}</strong> · {order.phone}</div>
                <div>🚛 {order.pickupLocation} → {order.dropLocation}</div>
                <div>📅 {order.date} · 📦 {order.goodsType}</div>
                <div>🔧 {order.vehicleType}{order.weight?` · ${order.weight}`:""}</div>
                {order.driver  && <div>👨‍✈️ {order.driver}</div>}
                {order.vehicle && <div>🔢 {order.vehicle}</div>}
                {order.amount>0 && <div>💰 <strong style={{ color:C.success }}>₹{order.amount.toLocaleString()}</strong></div>}
                {order.notes   && <div style={{ gridColumn:"1/-1" }}>📝 {order.notes}</div>}
              </div>
            </div>
            <button onClick={()=>editing===order.id?saveEdit(order.id):startEdit(order)} style={{ padding:"8px 20px", border:"none", borderRadius:8, background:editing===order.id?C.success:C.blue, color:C.white, fontWeight:700, fontSize:13, cursor:"pointer", whiteSpace:"nowrap" }}>
              {editing===order.id?"✅ Save":"✏️ Manage"}
            </button>
          </div>
          {editing===order.id && (
            <div style={{ marginTop:16, paddingTop:16, borderTop:`1px dashed ${C.border}`, display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:12 }}>
              {[
                ["Order Status", <select value={editData.status} onChange={e=>setEditData(p=>({...p,status:e.target.value}))} style={{ ...inputStyle, padding:"8px 10px" }}>{["Pending","Confirmed","In Transit","Delivered","Cancelled"].map(s=><option key={s} value={s}>{s}</option>)}</select>],
                ["Assign Driver", <select value={editData.driver} onChange={e=>setEditData(p=>({...p,driver:e.target.value}))} style={{ ...inputStyle, padding:"8px 10px" }}><option value="">— Not assigned —</option>{drivers.map(d=><option key={d.id} value={d.name}>{d.name} {d.available?"✅":"🔴 On Trip"}</option>)}</select>],
                ["Assign Vehicle", <select value={editData.vehicle} onChange={e=>setEditData(p=>({...p,vehicle:e.target.value}))} style={{ ...inputStyle, padding:"8px 10px" }}><option value="">— Not assigned —</option>{vehicles.map(v=><option key={v.id} value={v.number}>{v.number} ({v.type}) {v.available?"✅":"🔴"}</option>)}</select>],
                ["Amount (₹)", <input type="number" value={editData.amount} onChange={e=>setEditData(p=>({...p,amount:Number(e.target.value)}))} style={{ ...inputStyle, padding:"8px 10px" }} placeholder="0"/>],
              ].map(([lbl,el]) => (
                <div key={lbl}><label style={labelStyle}>{lbl}</label>{el}</div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function AdminCustomers({ customers, orders }) {
  return (
    <div style={{ background:C.white, borderRadius:12, overflow:"auto", boxShadow:"0 2px 8px rgba(0,0,0,0.05)", border:`1px solid ${C.border}` }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:14, minWidth:600 }}>
        <thead>
          <tr style={{ background:C.black, color:C.white }}>
            {["ID","Name","Email","Phone","City","Orders"].map(h=>(
              <th key={h} style={{ padding:"12px 16px", textAlign:"left", fontWeight:700, fontSize:13 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customers.map((c,i)=>{
            const oc = orders.filter(o=>o.customerId===c.id).length;
            return (
              <tr key={c.id} style={{ background:i%2===0?C.white:C.offWhite, borderBottom:`1px solid ${C.border}` }}>
                <td style={{ padding:"12px 16px", color:C.muted, fontSize:12 }}>{c.id}</td>
                <td style={{ padding:"12px 16px", fontWeight:700, color:C.black }}>{c.name}</td>
                <td style={{ padding:"12px 16px", color:C.muted }}>{c.email}</td>
                <td style={{ padding:"12px 16px" }}>{c.phone}</td>
                <td style={{ padding:"12px 16px" }}>{c.address}</td>
                <td style={{ padding:"12px 16px" }}><span style={{ background:"#EAF2FE", color:C.blueDk, borderRadius:12, padding:"3px 12px", fontWeight:800, fontSize:13, border:`1px solid ${C.blue}` }}>{oc}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function AdminFleet({ vehicles }) {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:14 }}>
      {vehicles.map(v=>(
        <div key={v.id} style={{ background:C.white, borderRadius:12, padding:20, boxShadow:"0 2px 8px rgba(0,0,0,0.05)", border:`1px solid ${C.border}`, borderLeft:`4px solid ${v.available?C.success:C.danger}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <span style={{ fontSize:28 }}>🚛</span>
            <span style={{ fontSize:12, fontWeight:700, background:v.available?C.successBg:C.dangerBg, color:v.available?C.success:C.danger, borderRadius:12, padding:"3px 10px" }}>{v.available?"Available":"In Use"}</span>
          </div>
          <div style={{ fontWeight:900, fontSize:16, color:C.black, marginBottom:4 }}>{v.number}</div>
          <div style={{ fontSize:13, color:C.muted, marginBottom:2 }}>{v.type}</div>
          <div style={{ fontSize:12, color:C.muted }}>Capacity: {v.capacity}</div>
        </div>
      ))}
    </div>
  );
}

function AdminDrivers({ drivers }) {
  return (
    <div>
      <p style={{ fontSize:13, color:C.muted, marginBottom:14 }}>
        💡 Availability updates automatically when you save an order with a driver assigned at <em>Confirmed</em> or <em>In Transit</em> status.
      </p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:14 }}>
        {drivers.map(d=>(
          <div key={d.id} style={{ background:C.white, borderRadius:12, padding:20, boxShadow:"0 2px 8px rgba(0,0,0,0.05)", border:`1px solid ${C.border}`, borderLeft:`4px solid ${d.available?C.success:C.danger}` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <div style={{ width:42, height:42, borderRadius:"50%", background:C.blue, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:17, color:C.white }}>{d.name[0]}</div>
              <span style={{ fontSize:12, fontWeight:700, background:d.available?C.successBg:C.dangerBg, color:d.available?C.success:C.danger, borderRadius:12, padding:"3px 10px" }}>
                {d.available?"✅ Available":"🔴 On Trip"}
              </span>
            </div>
            <div style={{ fontWeight:900, fontSize:16, color:C.black, marginBottom:4 }}>{d.name}</div>
            <div style={{ fontSize:13, color:C.muted, marginBottom:2 }}>📞 {d.phone}</div>
            <div style={{ fontSize:12, color:C.muted }}>License: {d.license}</div>
          </div>
        ))}
      </div>
    </div>
  );
}