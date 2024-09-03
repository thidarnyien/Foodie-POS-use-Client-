
function Topbar(){
  
    return (
        <div style={{display:"flex" ,justifyContent:"space-between",
            alignItems:"center",
            padding:"16px",
            position:"sticky",
            top:"0px",
            color:"#fcefee",
            userSelect:"none",
            backgroundColor: "#ee5a5a"}}>
          <h3 >Foodie POS</h3>
                <h3 >Sanchaung</h3>
                <h3 >Logout</h3>
        </div>
    )
}
export default Topbar;