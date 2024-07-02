#!/bin/sh

NAME_PROJECT="techtalent"

# Entrées à ajouter ou supprimer
HOST_ENTRIES="
127.0.0.1 auth.techtalent
127.0.0.1 app.techtalent
127.0.0.1 formation.techtalent
127.0.0.1 techtalent"

OS=$(uname)

add_hosts_entries() {
    local file_path="$1"
    local backup_path="${file_path}.${NAME_PROJECT}"

    sudo cp "$file_path" "$backup_path"
    echo "Backup of hosts file created at $backup_path"

    if echo "$HOST_ENTRIES" | sudo tee -a "$file_path" > /dev/null; then
        echo "Host entries added successfully."
    else
        echo "Failed to add host entries."
    fi
}

remove_hosts_entries() {
    local file_path="$1"
    local backup_path="${file_path}.${NAME_PROJECT}"

    if [ -f "$backup_path" ]; then
        sudo rm $file_path
        if sudo mv "$backup_path" "$file_path"; then
            echo "Backup file restored to $file_path"
        else
            echo "Failed to restore backup file."
        fi
    else
        echo "Backup file $backup_path not found."
    fi
}


if [ $# -ne 1 ]; then
    echo "Usage: $0 {set|remove}"
    exit 1
fi

ACTION=$1

case "$OS" in
    Linux|Darwin)
        HOSTS_FILE="/etc/hosts"
        ;;
    CYGWIN*)
        HOSTS_FILE="/cygdrive/c/Windows/System32/drivers/etc/hosts"
        ;;
    MINGW*)
        HOSTS_FILE="/c/Windows/System32/drivers/etc/hosts"
        ;;
    *)
        echo "Unsupported OS: $OS"
        exit 1
        ;;
esac

case "$ACTION" in
    set)
        add_hosts_entries "$HOSTS_FILE"
        ;;
    remove)
        remove_hosts_entries "$HOSTS_FILE"
        ;;
    *)
        echo "Invalid action: $ACTION"
        echo "Usage: $0 {set|remove}"
        exit 1
        ;;
esac
