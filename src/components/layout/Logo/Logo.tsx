import { Link } from "react-router";
import { Icon } from "../../icons";

export function Logo() {
  return (
    <Link className="dash-brand" to="/dashboard" aria-label="SubTrack Dashboard">
      <span>
        <Icon name="wallet" />
      </span>
      SubTrack
    </Link>
  );
}
