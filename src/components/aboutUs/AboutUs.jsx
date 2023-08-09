import styles from './aboutUs.module.css'
const AboutUs = () => {
    return <div className={styles.about}>
        <div className={styles.about__container}>
            <div className={styles.about__row}>
                <div className={styles.about__item}>
                    <div className={styles.about__title}>О нас</div>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et, reiciendis! Ipsam ad alias, sequi illum voluptatem libero? Autem, velit nam?</p>

                </div>
                <div className={styles.about__item}>
                    <div className={styles.about__img}><img src="https://avatars.mds.yandex.net/get-altay/1880508/2a0000016e362f966ecdc93e2c1976561db7/XXXL" alt="ofice" /></div>
                </div>
            </div>
        </div>
    </div>
}
export default AboutUs