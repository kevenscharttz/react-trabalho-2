import styles from './Input.module.css'
import SubmitButton from './SubmitButton'

function Input({type, text_btn , name, placeholder, handleOnChange, value}){
    return(
    <div className={styles.form_control}>
        <SubmitButton text={text_btn}/>
        {type !== 'sem_tipo' && (
                <input 
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    onChange={handleOnChange}
                    value={value} 
                />
            )}
        
    </div>
    )
}

export default Input