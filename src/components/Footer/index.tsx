import styles from "./Footer.module.css";


export default function Footer() {
  return (
    <footer className={styles.footer}>
        <p><span>Todo App</span> | &copy; 2024</p> 
        <p>Coded by <a href="https://github.com/Gustavo-Victor" target="_blank">Gustavo Victor</a></p>
    </footer>
  )
}
