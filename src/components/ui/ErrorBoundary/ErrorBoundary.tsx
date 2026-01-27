import { Component, type ErrorInfo, type ReactNode } from "react";
import { withTranslation, type WithTranslation } from "react-i18next";
import "./ErrorBoundary.css";
import reloadIcon from "../../../assets/arrow-up.svg";
import resetIcon from "../../../assets/erase.svg";

interface Props extends WithTranslation {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleClearAndReload = () => {
    localStorage.removeItem("cthulhu-investigator-data");
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      const { t } = this.props;
      return (
        <div className="eb-container">
          <div className="eb-content">
            <div className="eb-logo-pulp">
              <div className="eb-icon-invader">🐙</div>
              <div className="eb-call-of">{t("call_of")}</div>
              <div className="eb-cthulhu">CTHULHU</div>
            </div>
            <h1 className="eb-title">{t("error_boundary_title")}</h1>
            <p className="eb-message">
              "Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn"
              <br />
              <small>— {t("error_boundary_citation")}</small>
              <br />
              <br />
              {t("error_boundary_message")}
            </p>
            {this.state.error && (
              <pre className="eb-details">
                {this.state.error.name}: {this.state.error.message}
              </pre>
            )}
            <div className="eb-actions">
              <button
                onClick={this.handleReload}
                className="eb-btn eb-btn-primary"
              >
                <img
                  src={reloadIcon}
                  alt=""
                  className="eb-btn-icon eb-btn-icon-reload"
                />
                {t("error_boundary_reload")}
              </button>
              <button
                onClick={this.handleClearAndReload}
                className="eb-btn eb-btn-secondary"
              >
                <img src={resetIcon} alt="" className="eb-btn-icon" />
                {t("error_boundary_clear")}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const BoundErrorBoundary = withTranslation()(ErrorBoundary);
export default BoundErrorBoundary;
