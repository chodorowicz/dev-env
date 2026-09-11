export MISE_GITHUB_TOKEN={{MISE_GITHUB_TOKEN}}
export METABASE_SCRIPTS_DIR={{METABASE_SCRIPTS_DIR}}

if [[ -d "$METABASE_SCRIPTS_DIR" ]]; then
  case ":$PATH:" in
    *":$METABASE_SCRIPTS_DIR:"*) ;;
    *) export PATH="$METABASE_SCRIPTS_DIR:$PATH" ;;
  esac
fi

export MBU_DIR={{MBU_DIR}}

if [[ -d "$MBU_DIR" ]]; then
  case ":$PATH:" in
    *":$MBU_DIR:"*) ;;
    *) export PATH="$MBU_DIR:$PATH" ;;
  esac
fi
