export default function NowPlaying(props){
    console.log(props)
    if(!props.selectedTrack){
        return
    }

    return(
        <>
        <h1>{props.selectedTrack.title}</h1>
        <h2>Artist: {props.selectedTrack.artist}</h2>

        <button onClick={() => props.setSelectedTrack(null)}>Close</button>
        </>
    )
}