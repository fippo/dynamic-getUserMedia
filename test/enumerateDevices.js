describe('enumerateDevices inject', () => {
    beforeEach(() => {
        sessionStorage.clear();
    });

    it('filters audio devices when __filterAudioDevices is set', (done) => {
        sessionStorage.__filterAudioDevices = true;
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                const kinds = devices.map(d => d.kind);
                expect(kinds).not.to.contain('audioinput');
                done();
            });
    });

    it('filters video devices when __filterVideoDevices is set', (done) => {
        sessionStorage.__filterVideoDevices = true;
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                const kinds = devices.map(d => d.kind);
                expect(kinds).not.to.contain('videoinput');
                done();
            });
    });

    it('filters device labels when permission is denied', (done) => {
        sessionStorage.__getUserMediaAudioError = 'NotAllowedError';
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                const nonEmptyLabels = devices.filter(d => d.label !== '');
                expect(nonEmptyLabels).to.have.length(0);
                done();
            });
    });
});
