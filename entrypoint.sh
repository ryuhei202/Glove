set -e
 
# Remove a potentially pre-existing server.pid for Rails.
# rm -f /caian_app/tmp/pids/server.pid

bundle exec rails db:create
bundle exec rails db:migrate

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
