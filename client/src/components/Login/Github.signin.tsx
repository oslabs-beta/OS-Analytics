import styles from './Github.module.css';
import githubLogo from '../../assets/github.logo.png'




export default function GithubSignInButton() {
    return (
      <div className={styles.github}>
        <button
      className={styles.loginBtn}
    //   onClick={() => window.location.href = `${backendUrl}/api/github`}
    >
      <span className={styles.buttonText}>
        <img src={githubLogo} alt="GitHub logo" className={styles.githubLogo} />
        Continue with GitHub
      </span>
    </button>
      </div>
    );
  }