export function BaseAuthLayout(props) {
  return (
    <div className="auth-container">
      <div className="auth-img-content">
        <img src="/images/left-img.png"></img>
      </div>
      <div className="auth-form-content">
        <div className="form-container">{props.children}</div>
      </div>
    </div>
  );
}
