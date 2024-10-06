import AvatarComponent from "../Avatar/AvatarComponent"

const NotificationComponent = ()=>{
    return (
       <>
        <div>
            <AvatarComponent />
        </div>
        <div className="dropdownInfo">
            <h4>
                <span>
                    <b>Huy</b> mời bạn tham gia sự kiện mời bạn tham gia sự kiện mời bạn tham gia sự kiện
                </span>
            </h4>
            <p className="text-sky">Vài giây trước</p>
        </div>
       </>
    )
}

export default NotificationComponent