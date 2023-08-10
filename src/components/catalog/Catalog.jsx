import { Link } from 'react-router-dom'
import styles from './catalog.module.css'
import { useTranslation } from 'react-i18next'
const Catalog = () => {
    const { t, i18n } = useTranslation()
    return <div className={styles.catalog}>
        <h1 className={styles.catalog__title}>{t('catalog')}</h1>
        <div className={styles.catalog__container}>

            <div className={styles.catalog__row}>
                <div className={styles.catalog__column}>
                    <div className={styles.catalog__item}>
                        <div className={styles.catalog__img}><img src="https://firebasestorage.googleapis.com/v0/b/project-name-ae3d1.appspot.com/o/images%2F6422bb2c9a43f-50565-1.jpg?alt=media&token=c885e677-279b-41b1-8e2a-56660a92fd10" alt="" /></div>
                        <div className={styles.catalog__sub_title}>{t("wedding")}</div>
                        <div className={styles.catalog__text}>Элитная коллекция элегантных,
                            простых и плотных специальных приглашений</div>

                    </div>
                    <Link to={'/invintation/wedding'} className={styles.catalog__more}>Подробнее</Link>
                </div>
                <div className={styles.catalog__column}>
                    <div className={styles.catalog__item}>
                        <div className={styles.catalog__img}><img src="https://firebasestorage.googleapis.com/v0/b/project-name-ae3d1.appspot.com/o/images%2F6422bb2c9a43f-50565-1.jpg?alt=media&token=c885e677-279b-41b1-8e2a-56660a92fd10" alt="" /></div>
                        <div className={styles.catalog__sub_title}>{t("sunnat")}</div>
                        <div className={styles.catalog__text}>Элитная коллекция элегантных,
                            простых и плотных специальных приглашений</div>

                    </div>
                    <Link to={'/invintation/sunnat'} className={styles.catalog__more}>Подробнее</Link>
                </div>
            </div>
            <div className={styles.catalog__row}>
                <div className={styles.catalog__column}>
                    <div className={styles.catalog__item}>
                        <div className={styles.catalog__img}><img src="https://firebasestorage.googleapis.com/v0/b/project-name-ae3d1.appspot.com/o/images%2F6422bb2c9a43f-50565-1.jpg?alt=media&token=c885e677-279b-41b1-8e2a-56660a92fd10" alt="" /></div>
                        <div className={styles.catalog__sub_title}>{t("congratulatory")}</div>
                        <div className={styles.catalog__text}>Элитная коллекция элегантных,
                            простых и плотных специальных приглашений</div>

                    </div>
                    <Link to={'/invintation/congratulatory'} className={styles.catalog__more}>Подробнее</Link>
                </div>
                <div className={styles.catalog__column}>
                    <div className={styles.catalog__item}>
                        <div className={styles.catalog__img}><img src="https://profit.bg/uploads/userfiles/images/wedding3.JPG" alt="" /></div>
                        <div className={styles.catalog__sub_title}>{t("anniversary")}</div>
                        <div className={styles.catalog__text}>Элитная коллекция элегантных,
                            простых и плотных специальных приглашений</div>

                    </div>
                    <Link to={'/invintation/anniversary'} className={styles.catalog__more}>Подробнее</Link>
                </div>
            </div>

        </div>
    </div>
}
export default Catalog