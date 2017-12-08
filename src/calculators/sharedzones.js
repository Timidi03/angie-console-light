/**
 * Copyright 2017-present, Nginx, Inc.
 * Copyright 2017-present, Ivan Poluyanov
 * All rights reserved.
 *
 */

import { createMapFromObject } from './utils.js';

export default (sharedZones, previous, { __STATUSES }) => {
	if (sharedZones === null) {
		__STATUSES.shared_zones.ready = false;
		return null;
	}

	__STATUSES.shared_zones.ready = true;

	return createMapFromObject(sharedZones,
		(zone) => {
			zone.pages.total = zone.pages.used + zone.pages.free;
			zone.percentSize = Math.ceil(zone.pages.used / zone.pages.total * 100);

			return zone;
		}
	);
};

