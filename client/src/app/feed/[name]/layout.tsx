import FeedFooter from "../../../components/FeedFooter/FeedFooter";
import FeedNavbar from "../../../components/FeedNavbar/FeedNavbar";
import FeedSidebar from "../../../components/FeedSidebar/FeedSidebar";
import PostCreate from "../../../components/PostCreate/PostCreate";
import styles from "./page.module.scss"
export default async function FeedLayout({
 children,
 modal,
}: {
 children: React.ReactNode,
 modal: React.ReactNode,
}) {
 return (
  <div className={styles.container}>
   <div className={styles.feedWrapper}>
    <FeedSidebar />
    <div className={styles.postContainer}>
     <PostCreate />
     <FeedNavbar />
     {children}
     {modal}
    </div>
    <FeedFooter />
   </div>
  </div>
 )
}