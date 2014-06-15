# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "../../app/assets/ui/css"
sass_dir = "../../app/assets/ui/scss"
images_dir = "../../app/assets/ui/img"
javascripts_dir = "../../app/assets/js"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
 relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
 line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

additional_import_paths = ["../../app/frame/ui/scss",
                           "../../app/modules/mail/ui/scss",
                           "../../app/modules/tasks/ui/scss",
                           "../../app/assets/ui/components/autoComplete/ui/scss",
                           "../../app/assets/ui/components/tags/ui/scss",
                           "../../app/assets/ui/scss"]
