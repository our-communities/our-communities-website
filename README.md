# Our Communities Website

The Our Communities website, build with a focus on speed performance & SEO best practices.

## Features

This project has some lovely features

## Installation

### System Requirements

To use this project, you'll need the following things on your local machine:

#### Jekyll

```shell
gem install jekyll
```

#### NodeJS (8 or greater)

Download and open the [NodeJS installer](https://nodejs.org/en/)

### Up & Running

1. Fork the repo
2. Clone or download the repo into directory of your choice: `git clone https://github.com/your-github-username/our-communities-website.git.
3. Inside the directory run `bundle install` and `npm install`
4. Run `gulp dev`

## Usage

You can modify the theme by changing the settings in `_config.yml`.

#### Images

To generate the images needed for the theme, run `gulp img`;

### Site configuration

This site comes with [`jekyll-seo-tag`](https://github.com/jekyll/jekyll-seo-tag) plugin to make sure your website gets the most useful meta tags. See [usage](https://github.com/jekyll/jekyll-seo-tag/blob/master/docs/usage.md) to know how to set it up.

Additionally, in `_config.yml` you can find custom theme settings under `# THEME SETTINGS` comment. Here's a brief overview of those custom settings:

- `navigation` - collection of links that will be shown in the header
- `tagline` - text that will be displayed on the homepage under the heading.
- `hero_img` - background image of the homepage hero section

Other settings usually enable/disable certain feature, and are discussed with the next sections.

### Google Tag Manager

To enable Google Tag Manager, add the uncomment the following line in `_config.yml`:

```yaml
google_tag_manager: GTM-XXXXXXX
```

Replace `GTM-XXXXXXX` with your Google Tag Manager Container ID.

**Note** by default GTM tracking snippet will be also included in development environment.

Google Tag Manager was chosen for this project as it's more flexible than Google Analytics, and it can be used to add GA to your site.

## Contributing

Bug reports and pull requests are welcome on GitHub at [https://github.com/our-communities/our-communities-website]https://github.com/our-communities/our-communities-website). This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
