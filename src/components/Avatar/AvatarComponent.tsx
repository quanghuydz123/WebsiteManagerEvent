
interface Props {
    photoUrl?:string
}
const AvatarComponent = (props:Props) => {
    const {photoUrl} = props
    return (
        <div className="userImg">
            <span className="rounded-circl">
                <img src={photoUrl ?? "https://i.scdn.co/image/ab676161000051745a79a6ca8c60e4ec1440be53"} />
            </span>
        </div>
    )
}

export default AvatarComponent