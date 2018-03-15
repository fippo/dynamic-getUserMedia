/* karma does not wait for readystate itself. Workaround suggested in
 * https://github.com/karma-runner/karma/issues/1403
 */
before((done) => {
    if (document.readyState === 'complete') {
        done();
        return;
    }

    document.addEventListener('DOMContentLoaded', function(event) {
        done();
    });
});

