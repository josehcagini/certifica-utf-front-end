import Spinner from "@/components/spinner";
import styles from './styles.module.css'

export default function LoadingScreen() {
    return (
        <div className="loading-screen">
            <Spinner /> <span>Carregando...</span>
        </div>
    )
}

export function LoadingListSkeleton() {
    return (
        <div className={styles.loadingSkeleton}>
            <div className={styles.title} />
            <div className="defaultGrid">
                {['', '', ''].map((_, index) => (
                    <div className={styles.loadingListSkeleton} key={index}>
                        <div style={{ width: '100%' }}>
                            <div className={styles.itemTitle}></div>
                            <div className={styles.itemSubtitle}></div>
                        </div>
                        <div className={styles.itemButton}></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

