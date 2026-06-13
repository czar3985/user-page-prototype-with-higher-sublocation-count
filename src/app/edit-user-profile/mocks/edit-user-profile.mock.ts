import {GroupedLocationsResponse, LocationSearchResponse, UserProfile} from '../models/edit-user-profile.models';

export const MOCK_USER_PROFILE: UserProfile = {
    id: '9c0a801d-82fa-43e7-a5f9-316ceefb2001',
    clientId: 'd6b810c6-9c67-4493-9d8d-b9011ec5f001',
    firstName: 'Avery',
    lastName: 'Johnson',
    email: 'avery.johnson@example.com',
    primaryLocationId: '10000000-0000-0000-0000-000000000001',
    primaryLocationName: 'Primary Location A'
};
export const MOCK_GROUPED_LOCATIONS: GroupedLocationsResponse = {
    pageIndex: 0,
    pageSize: 5,
    totalCount: 5,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    data: [{
        id: '10000000-0000-0000-0000-000000000001',
        name: 'Primary Location A',
        isLinkedToUser: true,
        sublocations: [{
            id: '20000000-0000-0000-0000-000000000011',
            name: 'Sub Location A1',
            isLinkedToUser: true
        }, {
            id: '20000000-0000-0000-0000-000000000012',
            name: 'Sub Location A2',
            isLinkedToUser: true
        }, {
            id: '20000000-0000-0000-0000-000000000013',
            name: 'Sub Location A3',
            isLinkedToUser: false
        }, {
            id: '20000000-0000-0000-0000-000000000014',
            name: 'Sub Location A4',
            isLinkedToUser: false
        }]
    }, {
        id: '10000000-0000-0000-0000-000000000002',
        name: 'Primary Location B',
        isLinkedToUser: false,
        sublocations: [{
            id: '20000000-0000-0000-0000-000000000021',
            name: 'Sub Location B1',
            isLinkedToUser: false
        }, {
            id: '20000000-0000-0000-0000-000000000022',
            name: 'Sub Location B2',
            isLinkedToUser: false
        }, {
            id: '20000000-0000-0000-0000-000000000023',
            name: 'Sub Location B3',
            isLinkedToUser: false
        }]
    }, {
        id: '10000000-0000-0000-0000-000000000003',
        name: 'Primary Location C',
        isLinkedToUser: true,
        sublocations: [{
            id: '20000000-0000-0000-0000-000000000031',
            name: 'Sub Location C1',
            isLinkedToUser: true
        }, {
            id: '20000000-0000-0000-0000-000000000032',
            name: 'Sub Location C2',
            isLinkedToUser: false
        }]
    }, {
        id: '10000000-0000-0000-0000-000000000004',
        name: 'Primary Location D',
        isLinkedToUser: true,
        sublocations: [{
            id: '20000000-0000-0000-0000-000000000041',
            name: 'Sub Location D1',
            isLinkedToUser: false
        }, {
            id: '20000000-0000-0000-0000-000000000042',
            name: 'Sub Location D2',
            isLinkedToUser: true
        }, {
            id: '20000000-0000-0000-0000-000000000043',
            name: 'Sub Location D3',
            isLinkedToUser: false
        }]
    }, {
        id: '10000000-0000-0000-0000-000000000005',
        name: 'Primary Location E',
        isLinkedToUser: false,
        sublocations: [{
            id: '20000000-0000-0000-0000-000000000051',
            name: 'Sub Location E1',
            isLinkedToUser: false
        }, {
            id: '20000000-0000-0000-0000-000000000052',
            name: 'Sub Location E2',
            isLinkedToUser: false
        }]
    }]
};
export const MOCK_PRIMARY_LOCATION_SEARCH: LocationSearchResponse = {
    data: [{
        id: '10000000-0000-0000-0000-000000000001',
        name: 'Primary Location A',
        parentLocationId: null,
        parentLocationName: null,
        sublocations: null
    }, {
        id: '10000000-0000-0000-0000-000000000002',
        name: 'Primary Location B',
        parentLocationId: null,
        parentLocationName: null,
        sublocations: null
    }, {
        id: '10000000-0000-0000-0000-000000000003',
        name: 'Primary Location C',
        parentLocationId: null,
        parentLocationName: null,
        sublocations: null
    }, {
        id: '10000000-0000-0000-0000-000000000004',
        name: 'Primary Location D',
        parentLocationId: null,
        parentLocationName: null,
        sublocations: null
    }, {
        id: '10000000-0000-0000-0000-000000000005',
        name: 'Primary Location E',
        parentLocationId: null,
        parentLocationName: null,
        sublocations: null
    }], skipCount: 0, startIndex: 0, takeSize: 20, totalCount: 5
};
export const MOCK_ACCESSIBLE_LOCATION_SEARCH: LocationSearchResponse = {
    data: [{
        id: '10000000-0000-0000-0000-000000000001',
        name: 'Primary Location A',
        parentLocationId: null,
        parentLocationName: null,
        isLinkedToUser: true,
        sublocations: [{
            id: '20000000-0000-0000-0000-000000000011',
            name: 'Sub Location A1',
            isLinkedToUser: true
        }, {
            id: '20000000-0000-0000-0000-000000000012',
            name: 'Sub Location A2',
            isLinkedToUser: true
        }, {
            id: '20000000-0000-0000-0000-000000000013',
            name: 'Sub Location A3',
            isLinkedToUser: false
        }, {
            id: '20000000-0000-0000-0000-000000000014',
            name: 'Sub Location A4',
            isLinkedToUser: false
        }]
    }, {
        id: '10000000-0000-0000-0000-000000000002',
        name: 'Primary Location B',
        parentLocationId: null,
        parentLocationName: null,
        isLinkedToUser: false,
        sublocations: [{
            id: '20000000-0000-0000-0000-000000000021',
            name: 'Sub Location B1',
            isLinkedToUser: false
        }, {
            id: '20000000-0000-0000-0000-000000000022',
            name: 'Sub Location B2',
            isLinkedToUser: false
        }, {
            id: '20000000-0000-0000-0000-000000000023',
            name: 'Sub Location B3',
            isLinkedToUser: false
        }]
    }, {
        id: '20000000-0000-0000-0000-000000000031',
        name: 'Sub Location C1',
        parentLocationId: '10000000-0000-0000-0000-000000000003',
        parentLocationName: 'Primary Location C',
        sublocations: null,
        isLinkedToUser: true
    }, {
        id: '20000000-0000-0000-0000-000000000032',
        name: 'Sub Location C2',
        parentLocationId: '10000000-0000-0000-0000-000000000003',
        parentLocationName: 'Primary Location C',
        sublocations: null,
        isLinkedToUser: false
    }, {
        id: '10000000-0000-0000-0000-000000000004',
        name: 'Primary Location D',
        parentLocationId: null,
        parentLocationName: null,
        isLinkedToUser: true,
        sublocations: [{
            id: '20000000-0000-0000-0000-000000000041',
            name: 'Sub Location D1',
            isLinkedToUser: false
        }, {
            id: '20000000-0000-0000-0000-000000000042',
            name: 'Sub Location D2',
            isLinkedToUser: true
        }, {
            id: '20000000-0000-0000-0000-000000000043',
            name: 'Sub Location D3',
            isLinkedToUser: false
        }]
    }, {
        id: '20000000-0000-0000-0000-000000000051',
        name: 'Sub Location E1',
        parentLocationId: '10000000-0000-0000-0000-000000000005',
        parentLocationName: 'Primary Location E',
        sublocations: null,
        isLinkedToUser: false
    }, {
        id: '20000000-0000-0000-0000-000000000052',
        name: 'Sub Location E2',
        parentLocationId: '10000000-0000-0000-0000-000000000005',
        parentLocationName: 'Primary Location E',
        sublocations: null,
        isLinkedToUser: false
    }], skipCount: 0, startIndex: 0, takeSize: 20, totalCount: 7
};
