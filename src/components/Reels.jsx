import React, { useState, useEffect } from "react";
import Reel from "./Reel";
import "./Reels.scss";

import ReelLoader from "./ReelLoader";

function Reels() {
  // TODO update images url
  const [reelsInfo, setReelsInfo] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    let staticInfo = [
      {
        id: "adwe",
        userImage:
          "https://scontent-iad3-2.xx.fbcdn.net/v/t1.6435-1/103261560_137051111312437_923243135553259717_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=1eb0c7&_nc_ohc=Lu-DcFn8m3cAX-dliZP&_nc_ht=scontent-iad3-2.xx&oh=00_AT8RcBanqsdkOpUSIP9QBxBtxOpg6FWVI5M8xglKP8hFog&oe=62B84086",
        title: "Good Vibe ",
        poster: "https://source.unsplash.com/random/200x300?sig=1",
        view: "1.2m",
      },
      {
        id: "adwe2",
        userImage:
          "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-1/280266251_333304628948893_585187191683691582_n.jpg?stp=c0.0.40.40a_cp0_dst-jpg_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=c6021c&_nc_ohc=Ljz39lzRjiUAX_tzeDo&_nc_ht=scontent-iad3-2.xx&oh=00_AT88LJJUyYju9SgzEx7-4OJ7BLdretwmjERaqxwM6jtM2A&oe=6295DC83",
        title: "WWE",
        poster: "https://source.unsplash.com/random/200x300?sig=2",
        view: "5.5m",
      },
      {
        id: "adwe3",
        userImage:
          "https://scontent-iad3-2.xx.fbcdn.net/v/t1.6435-1/160562895_280347996804125_1984265008117773009_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=c6021c&_nc_ohc=9EPaNKKRP-kAX8HTEM6&_nc_ht=scontent-iad3-2.xx&oh=00_AT9Zqqc6WL5F9GWU9qj5kKN-GPPao90boZPY-9V4mDQPLw&oe=62B6BCC5",
        title: "Koera Obidy ",
        poster: "https://source.unsplash.com/random/200x300?sig=3",
        view: "2.4m",
      },
      {
        id: "adwe4",
        userImage:
          "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-1/274695809_486517156365951_6596823829159401731_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=c6021c&_nc_ohc=P5PkkLXsOkQAX_kT9zz&_nc_ht=scontent-iad3-2.xx&oh=00_AT_pNr8pQN5gOHcKwDN8RVSQRwbaxn6WNsihFFeenEvktQ&oe=6296A1B8",
        title: "Best Ice ",
        poster: "https://source.unsplash.com/random/200x300?sig=4",
        view: "5.8m",
      },
      {
        id: "adwe5",
        userImage:
          "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-1/274655475_149597667471786_3728653344744546239_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=105&ccb=1-7&_nc_sid=c6021c&_nc_ohc=wIQfYQeZVNUAX8cAqB1&_nc_ht=scontent-iad3-2.xx&oh=00_AT8LUlzggPYZGuZHGlC_5XSzoxIqJPyFN3V_XzZmdph3NQ&oe=6296941A",
        title: "Nice Talent",
        poster: "https://source.unsplash.com/random/200x300?sig=5",
        view: "6.4m",
      },
    ];

    async function getUser() {
      let users;
      try {
        users = await fetch("https://randomuser.me/api/?results=10");
        users = await users.json();
        users = users.results;
      } catch {
        setReelsInfo(staticInfo);
        setIsLoaded(true);
        return;
      }
      staticInfo = staticInfo.map((e, key) => ({
        ...e,
        userImage: users[key].picture.medium,
      }));
      setReelsInfo(staticInfo);
      setIsLoaded(true);
    }
    getUser();
  }, []);

  return (
    <>
      <h1 className="font-bold text-2xl">Reels</h1>
      <div
        className="flex flex-nowrap gap-3 p-3 my-3"
        style={{ overflowX: "auto", flexBasis: "200px" }}
      >
        {isLoaded ? (
          reelsInfo.map((e) => <Reel {...e} key={e.id} />)
        ) : (
          <>
            <ReelLoader />
            <ReelLoader />
            <ReelLoader />
            <ReelLoader />
            <ReelLoader />
          </>
        )}
      </div>
    </>
  );
}

export default Reels;
