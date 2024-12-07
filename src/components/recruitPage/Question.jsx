import styles from "../../styles/recruitPage/question.module.css"

export default function Question() {
    const messages = [
        { type: 'user', text: '저는 이렇게 궁금해요 잘 모르겠어용 ^^' },
        { type: 'response', text: '그렇시구나 그건 말이죠\n이렇게 저렇게 하는겁니다.\n파이팅 ^^' },
        { type: 'user', text: '저는 이렇게 궁금해요 잘 모르겠어용 ^^' },
        { type: 'response', text: '그렇시구나 그건 말이죠\n이렇게 저렇게 하는겁니다.\n파이팅 ^^' },
        { type: 'user', text: '저는 이렇게 궁금해요 잘 모르겠어용 ^^' },
        { type: 'response', text: '그렇시구나 그건 말이죠\n이렇게 저렇게 하는겁니다.\n파이팅 ^^' },
    ];

    return (
        <div id="questionSection" className={styles.allContainer}>
            <p className={styles.title}>자주 묻는 질문</p>
            <div className={styles.chatContainer}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={
                            message.type === 'user'
                                ? styles.messageUser
                                : styles.messageResponse
                        }
                    >
                        {message.text.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}