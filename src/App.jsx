import { useState, useEffect } from "react";

import * as trackService from "./services/trackService";

import TrackList from "./components/TrackList";
import NowPlaying from "./components/NowPlaying";
import TrackForm from "./components/TrackForm";

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    async function getTracks() {
      try {
        const tracks = await trackService.index();
        console.log(tracks, "<-- tracks from express server");
        setTracks(tracks);
      } catch (err) {
        console.log(err);
      }
    }
    getTracks();
  }, []);

  async function handleAddTrack(formData) {
    try {
      const newTrack = await trackService.create(formData);
      console.log(newTrack, "<-- response from the server");
      setTracks([newTrack.data, ...tracks]);
    } catch (err) {
      console.log(err, "<-- err in handleAddTracks");
    }
  }
  return (
    <>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close" : "Create Track"}
      </button>
      {showForm ? <TrackForm handleAddTrack={handleAddTrack} /> : ""}
      <TrackList trackList={tracks} setSelectedTrack={setSelectedTrack} />
      <NowPlaying
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
      />
    </>
  );
};

export default App;
