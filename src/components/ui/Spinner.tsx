const spinnerCss =
  'absolute m-2 box-border block h-16 w-16 animate-loadingRing rounded-full border-8 border-solid border-transparent border-t-slate-500';

const Spinner = () => {
  return (
    <div className="h-20 w-20">
      <div className={spinnerCss} style={{ animationDelay: '-0.45s' }} />
      <div className={spinnerCss} style={{ animationDelay: '-0.3s' }} />
      <div className={spinnerCss} style={{ animationDelay: '-0.15s' }} />
      <div className={spinnerCss} />
    </div>
  );
};

export default Spinner;
