import MenuLink from "../menuLink/menuLink";
import styles from "./sidebar.module.css"
import Image from "next/image";
import { menuItems } from '@utils/constants';
import { MdLogout } from "react-icons/md";
import { auth, signOut } from "@/app/auth";
import { signOutSide } from "@/app/utils/action";

const SideBar = async () => {

  const session = await auth()
  console.log(session)
  //console.log(menuItems)

  return (
    <div className={styles.container}>
      <div className={styles.user}>
          <Image className={styles.userImage} src={session.img || "/noavatar.png"} 
                 alt="" 
               width="50" 
              height="50" />
      </div>
      <div className={styles.userDetail}>
          <span className={styles.username}>{session.username}</span>
          <span className={styles.userTitle}>{session.isAdmin ? "Admin" : "Client"}</span>
      </div>
      <ul className={styles.list}>
        {menuItems.map(cat =>( 
            <li key={cat.title}>
              <span className={styles.cat}>
                {cat.title}
              </span>

              {cat.list.map((item) => (
                  <MenuLink item={item} key={item.title} />
              ))}

            </li>

        ))}
      </ul>
      <form action={signOutSide}>
        <button className={styles.logout}> 
        <MdLogout />
        Logout </button>
      </form>
    </div>
  )
}

export default SideBar