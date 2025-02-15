import styles from './not-found-block.module.scss'

const NotFoundBlock = () => {
    return (
        <div className={styles.wrapper}>
            <span>😕</span>
            <br />
            <h1>ничего не найдено</h1>
            <p>к сожалению данная страница отсутствует в нашем интернет-магазине</p>
            dsf
        </div>
    )
}

export default NotFoundBlock;
