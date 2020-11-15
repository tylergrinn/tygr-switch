read -p 'NPM Package [@tygr/logo] : ' npmPackage
read -p 'Github repository [tylergrinn/tygr-logo] : ' repository
read -p 'Package name [tygr-logo] : ' package
read -p 'Library name [TygrLogo] : ' library
read -p 'Component name [Logo] : ' component
read -p 'Common name [TyGr Logo] : ' common
read -p 'Description [Logo for tygr] : ' description

# development (ignore)
# npmPackage='@tygr/rename'
# repository='tylergrinn/tygr-rename'
# package='tygr-rename'
# library='TygrRename'
# component='Rename'
# common='TyGr Rename'
# description='Rename test'

# COMPONENT
for f in 'README.md' 'src/index.ts' 'src/standalone.ts' 'src/Logo.tsx' 'README.md' 'demo/*.ts*'; do
  sed -i "s;Logo;$component;g" $f
done

mv src/Logo.tsx src/$component.tsx

# REPOSITORY
for f in 'package.json' '.travis.yml'; do
  sed -i "s;tylergrinn/tygr-logo;$repository;g" $f
done

# PACKAGE
for f in 'webpack.config.js' 'package.json' 'README.md' 'demo/browser.html' 'demo/*.ts*'; do
  sed -i "s;tygr-logo;$package;g" $f
done

# LIBRARY
for f in 'README.md' 'webpack.config.js' 'demo/browser.html'; do
  sed -i "s;TygrLogo;$library;g" $f
done

# NPM PACKAGE
for f in 'package.json' 'README.md' '.travis.yml'; do
  sed -i "s;@tygr/logo;$npmPackage;g" $f
done

# DESCRIPTION
sed -i "s;Logo for tygr;$description;g" package.json

# COMMON NAME
for f in 'README' 'demo/*.html'; do
  sed -i "s;TyGr Logo;$common;g" demo/*.html
done
