export default function MusicList({ image, title }) {
    return (
        <div className="flex flex-row items-center justify-center bg-transparent bg-[url('/media/coral_button.png')] bg-[length:108%_120%] bg-center bg-no-repeat">
            <img src={image} alt={title} className="w-11 object-cover rounded-xl" />
            <h1 className="text-2xl font-bold mx-5 my-3">{title}</h1>
        </div>
    )
}