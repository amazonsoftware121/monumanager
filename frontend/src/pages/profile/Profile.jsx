import "./profile.scss";


const Profile = () => {
  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img
          src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
           
          </div>
          <div className="center">
            <span>Jane Doe</span>
            <div className="info">
              <div className="item">
               
                <span>USA</span>
              </div>
              <div className="item">
               
                <span>lama.dev</span>
              </div>
            </div>
            <button>follow</button>
          </div>
          <div className="right">
            
          </div>
        </div>
    
    
      </div>
    </div>

  )
}

export default Profile