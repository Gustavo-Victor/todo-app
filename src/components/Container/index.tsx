import styles from "./Container.module.css"; 

type Props = {
    children: React.ReactNode
}; 

export default function Container({children}: Props) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}
