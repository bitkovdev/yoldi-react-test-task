import styles from "./usersListPage.module.scss"
import useSWR from "swr"
import { fetchGetUsers } from "@/shared/api/requests"
import clsx from "clsx"
import { Avatar } from "@/shared/ui/Avatar/ui/avatar"
import { useRouter } from "next/navigation"

const UsersListPage = () => {
  const { data } = useSWR("/user GET", fetchGetUsers)
  const router = useRouter()
  return (
    <div className={styles.container}>
      <h1 className={clsx("title")}>Список аккаунтов</h1>
      <ul className={styles.usersList}>
        {data?.map(item => (
          <li
            className={styles.usersListItem}
            onClick={() => router.push(`/user/${item.slug}`)}
            key={item.email}
          >
            <Avatar name={item.name} avatarId={item.image?.id} />
            <div className={styles.usersListItemInfo}>
              <h2 className={clsx("button-text", styles.usersListItemName)}>
                {item.name}
              </h2>
              <h3 className={clsx("paragraph", styles.usersListItemEmail)}>
                {item.email}
              </h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UsersListPage
