/* eslint-disable */ 
import * as resizeSrv from "../../src/modules/resize-image/service";
import fs from "fs";

describe("Resize Image Service", () => {
const res = {
    sendFile: () => {
        return { end: () => { } };
    },
    status: (status) => {
        return {
            json: () => {
                return { end: () => { } };
            }
        };
    }
};

jasmine.createSpy('sharp', () => () => ({
    resize: () => ({

    })
}));
it('Call resizeImage function with valid data and already cached file', () => {
    spyOn(res, 'sendFile').and.callThrough();
    spyOn(fs, 'existsSync').and.returnValue(true);
    resizeSrv.resizeImage(res, () => { }, { imageName: 'sea.jpg', width: 500, height: 300 });
    expect(res.sendFile).toHaveBeenCalled();
});

it('Call resizeImage function with valid data and not cached file', () => {
    spyOn(res, 'sendFile').and.callThrough();

    spyOn(fs, 'existsSync').and.callFake(() => {
        let index = 1;
        const returnValue = !!index;
        index--;
        return returnValue;
    });
    resizeSrv.resizeImage(res, () => { }, { imageName: 'sea.jpg', width: 500, height: 300 });
    expect(res.sendFile).toHaveBeenCalled();
});

it('Call resizeImage function with valid data and not cached file', () => {
    spyOn(resizeSrv, 'reziedWithSharp').and.callThrough();
    let index = 1;
    spyOn(fs, 'existsSync').and.callFake(() => {
        const returnValue = !!index;
        index--;
        return returnValue;
    });
    resizeSrv.resizeImage(res, () => { }, { imageName: 'sea.jpg', width: 500, height: 300 });
    expect(resizeSrv.reziedWithSharp).toHaveBeenCalled();
});

it('Call resizeImage function with an image not exist', () => {
    spyOn(resizeSrv, 'reziedWithSharp').and.callThrough();
    spyOn(fs, 'existsSync').and.returnValue(false);
    spyOn(res, 'status').and.callThrough();
    spyOn(res, 'sendFile').and.callThrough();

    resizeSrv.resizeImage(res, () => { }, { imageName: 'sea.jpg', width: 500, height: 300 });
    expect(res.sendFile).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
});

it('Call resizeImage function with invalid data', () => {
    spyOn(resizeSrv, 'reziedWithSharp').and.callThrough();
    spyOn(res, 'status').and.callThrough();
    spyOn(res, 'sendFile').and.callThrough();
    let index = 1;
    spyOn(fs, 'existsSync').and.callFake(() => {
        const returnValue = !!index;
        index--;
        return returnValue;
    });
    resizeSrv.resizeImage(res, () => { }, { imageName: 'sea.jpg', width: '' as any , height: 300 } );
    expect(res.sendFile).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
});
});