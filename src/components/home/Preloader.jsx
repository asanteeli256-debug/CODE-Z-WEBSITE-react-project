/* Loading screen (progress is driven by useHeroLoader) */
export default function Preloader({ preloaderRef, barRef, numRef }) {
  return (
    <div className="preloader" id="preloader" ref={preloaderRef}>
      <div className="curtain curtain-top"></div>
      <div className="curtain curtain-bottom"></div>

      <div className="preloader-content">
        <img src="/LOGO/logo.png" alt="CODEZ" className="preloader-logo" />
        <div className="progress-track">
          <div className="progress-bar" id="progressBar" ref={barRef}></div>
        </div>
        <div className="progress-text"><span id="progressNum" ref={numRef}>0</span>%</div>
      </div>
    </div>
  );
}
