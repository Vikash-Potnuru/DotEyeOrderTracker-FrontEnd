import './index.css'

const TypingIndicator = ({label}) => (
  <div className="typingIndicator">
    <span></span><span></span><span></span>
    <p>{label} is typing...</p>
  </div>
)

export default TypingIndicator
