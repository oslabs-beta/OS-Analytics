import styles from './google.module.css';
import { backendUrl } from '../../state/Atoms';
import googleLogo from '../../assets/g-logo.png'


export default function GoogleSignInButto(){
    return (
        <div className={styles.google}>
<button className={styles.loginBtn} onClick={() => window.location.href = `${backendUrl}/api/google`}>
  <img src={googleLogo} alt="Google logo" className={styles.googleLogo} />
  <span className={styles.buttonText}>Sign in with Google</span>
</button>
           
        </div>
        
    )
}
