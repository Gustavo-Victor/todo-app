// import { MouseEvent } from "react";
import { BsXLg } from "react-icons/bs";
import styles from "./Modal.module.css";

interface Props {
    children: React.ReactNode
}


export default function Modal({ children }: Props) {
    const closeModal = () => {
        const modal = document.querySelector("#modal"); 
        modal!.classList.add("hide"); 
    }

    return (
        <div id="modal" className="hide">
            <div className={styles.fade}></div>
            <div className={styles.modal}>
                <BsXLg onClick={closeModal} />
                {children}
            </div>
        </div>
    )
}
