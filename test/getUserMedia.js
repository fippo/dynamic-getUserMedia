describe('getUserMedia inject', () => {
    beforeEach(() => {
        sessionStorage.clear();
    });

    it('returns the audio error when __getUserMediaAudioError is set', (done) => {
        const errorName = 'some error';
        sessionStorage.__getUserMediaAudioError = errorName;
        navigator.mediaDevices.getUserMedia({audio: true})
            .catch((err) => {
                expect(err.name).to.equal(errorName);
                done();
            });
    });

    it('returns the video error when __getUserMediaVideoError is set', (done) => {
        const errorName = 'some error';
        sessionStorage.__getUserMediaVideoError = errorName;
        navigator.mediaDevices.getUserMedia({video: true})
            .catch((err) => {
                expect(err.name).to.equal(errorName);
                done();
            });
    });

    it('returns NotFoundError when calling with audio:true and __filterAudioDevices is set', (done) => {
        sessionStorage.__filterAudioDevices = 1;
        navigator.mediaDevices.getUserMedia({audio: true})
            .catch((err) => {
                expect(err.name).to.equal('NotFoundError');
                done();
            });
    });

    it('returns NotFoundError when calling with video:true and __filterVideoDevices is set', (done) => {
        sessionStorage.__filterVideoDevices = 1;
        navigator.mediaDevices.getUserMedia({video: true})
            .catch((err) => {
                expect(err.name).to.equal('NotFoundError');
                done();
            });
    });
});
