import React from "react";
import Reel from "./Reel";
import "./Reels.scss";
function Reels() {
  const reelsInfo = [
    {
      id: "adwe",
      userImage:
        "https://scontent-iad3-2.xx.fbcdn.net/v/t1.6435-1/103261560_137051111312437_923243135553259717_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=1eb0c7&_nc_ohc=Lu-DcFn8m3cAX-dliZP&_nc_ht=scontent-iad3-2.xx&oh=00_AT8RcBanqsdkOpUSIP9QBxBtxOpg6FWVI5M8xglKP8hFog&oe=62B84086",
      title: "Good Vibe ",
      poster:
        "https://scontent-cdg2-1.xx.fbcdn.net/v/t15.5256-10/279077718_2093602897477734_8359048145570449952_n.jpg?stp=dst-jpg_s960x960&_nc_cat=1&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=kOuMPPEBM9cAX84dlBs&_nc_ht=scontent-cdg2-1.xx&oh=00_AT-r3WuE7TYLztB4CEGHal3luqB_VsYZBuipmhDiMAlW3Q&oe=62954255",
      view: "1.2m",
    },
    {
      id: "adwe2",
      userImage:
        "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-1/280266251_333304628948893_585187191683691582_n.jpg?stp=c0.0.40.40a_cp0_dst-jpg_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=c6021c&_nc_ohc=Ljz39lzRjiUAX_tzeDo&_nc_ht=scontent-iad3-2.xx&oh=00_AT88LJJUyYju9SgzEx7-4OJ7BLdretwmjERaqxwM6jtM2A&oe=6295DC83",
      title: "WWE",
      poster:
        "https://scontent-cdg2-1.xx.fbcdn.net/v/t15.5256-10/277363004_722545102079620_4782728459304798558_n.jpg?stp=dst-jpg_s960x960&_nc_cat=1&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=6UdjcFO-2LkAX9--lva&_nc_oc=AQmPJ6I2_6ez5YDrbispueEsDEqM97XvFX7U-UjYjcvi75T7_nvQqCkNv_B_mZIWmEE&tn=ljKRiwZOqptwHHuk&_nc_ht=scontent-cdg2-1.xx&oh=00_AT8sJTAexPLO0Sqkc9nXTzdacN5Y6GvOxOVsgnUZXf3CXQ&oe=6294F714",
      view: "5.5m",
    },
    {
      id: "adwe3",
      userImage:
        "https://scontent-iad3-2.xx.fbcdn.net/v/t1.6435-1/160562895_280347996804125_1984265008117773009_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=c6021c&_nc_ohc=9EPaNKKRP-kAX8HTEM6&_nc_ht=scontent-iad3-2.xx&oh=00_AT9Zqqc6WL5F9GWU9qj5kKN-GPPao90boZPY-9V4mDQPLw&oe=62B6BCC5",
      title: "Koera Obidy ",
      poster:
        "https://scontent-cdg2-1.xx.fbcdn.net/v/t15.5256-10/279047332_3099080357074202_3010778093112432700_n.jpg?stp=dst-jpg_s960x960&_nc_cat=1&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=xTpR3KpPLRwAX_58R3e&_nc_ht=scontent-cdg2-1.xx&oh=00_AT9ObhAQwELy3twIqPepOkbE95LDrNRPuu-Jm5OwAxVeGA&oe=6295F0E1",
      view: "2.4m",
    },
    {
      id: "adwe4",
      userImage:
        "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-1/274695809_486517156365951_6596823829159401731_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=c6021c&_nc_ohc=P5PkkLXsOkQAX_kT9zz&_nc_ht=scontent-iad3-2.xx&oh=00_AT_pNr8pQN5gOHcKwDN8RVSQRwbaxn6WNsihFFeenEvktQ&oe=6296A1B8",
      title: "Best Ice ",
      poster:
        "https://scontent-iad3-2.xx.fbcdn.net/v/t15.5256-10/280606762_1145590996263700_8842541681610069963_n.jpg?stp=dst-jpg_s960x960&_nc_cat=1&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=GYyWzbkF6yYAX8qwla8&_nc_ht=scontent-iad3-2.xx&oh=00_AT9FuPSr2SLiDFEbtzSgBwVnG1rf8qI80f8YZVXFkRvRDQ&oe=6295AC71",
      view: "5.8m",
    },
    {
      id: "adwe5",
      userImage:
        "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-1/274655475_149597667471786_3728653344744546239_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=105&ccb=1-7&_nc_sid=c6021c&_nc_ohc=wIQfYQeZVNUAX8cAqB1&_nc_ht=scontent-iad3-2.xx&oh=00_AT8LUlzggPYZGuZHGlC_5XSzoxIqJPyFN3V_XzZmdph3NQ&oe=6296941A",
      title: "Nice Talent",
      poster:
        "https://scontent-iad3-2.xx.fbcdn.net/v/t15.5256-10/278859114_403924344882107_3378980155924977924_n.jpg?stp=dst-jpg_s960x960&_nc_cat=1&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=p1ShYDBLeawAX_fk_4r&tn=ljKRiwZOqptwHHuk&_nc_ht=scontent-iad3-2.xx&oh=00_AT_GE0kkhxekAE-0B998yE4haS3PQQ15cKT_gYK0L7IrNw&oe=6295835F",
      view: "6.4m",
    },
  ];

  return (
    <>
      <h1 className="font-bold text-2xl">Reels</h1>
      <div
        className="flex flex-nowrap gap-3 p-3 my-3"
        style={{ overflowX: "auto", flexBasis: "200px" }}
      >
        {reelsInfo.map((e) => (
          <Reel {...e} key={e.id} />
        ))}
      </div>
    </>
  );
}

export default Reels;
