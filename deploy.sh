#!/bin/bash
#
# This script deploys main branch commits to gh-pages root directory and other branches to
# sub-directory /branch/<branch-name>.
#
# Rendered branches can be accessed via https://thingset.io/branch/<branch-name>
#

BRANCH_NAME=$(echo ${GITHUB_REF#refs/heads/})

# adjust link/directory settings in vuepress
if [ $BRANCH_NAME != "main" ]; then
    printf "\nPreparing deployment for branch $BRANCH_NAME\n"
    sed -i -e "s/base: '\/'/base: '\/branch\/$BRANCH_NAME\/'/g" docs/.vuepress/config.ts
    sed -i -e "s/docsBranch: 'main'/docsBranch: '$BRANCH_NAME'/g" docs/.vuepress/config.ts
else
    printf "\nPreparing deployment for main branch\n"
fi

# build the website
npm run build
printf "\n\n"

# get previous gh-pages deployment including all PR and branch folders
rm -rf gh-pages
git clone -b gh-pages https://github.com/ThingSet/thingset.github.io gh-pages

# compile folders correctly
if [ $BRANCH_NAME != "main" ]; then
    mkdir -p gh-pages/branch
    rm -rf "gh-pages/branch/$BRANCH_NAME"
    cp -r docs/.vuepress/dist "gh-pages/branch/$BRANCH_NAME"
else
    if [ -d "gh-pages/branch" ]; then
        mv gh-pages/branch docs/.vuepress/dist/
    fi
    rm -rf gh-pages
    mv docs/.vuepress/dist gh-pages
fi

echo "Preparation and build done."

exit 0
