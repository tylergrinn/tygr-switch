#!/bin/sh

rsync --recursive --delete $TRAVIS_BUILD_DIR/lib node@tygr.info:@tygr/logo
